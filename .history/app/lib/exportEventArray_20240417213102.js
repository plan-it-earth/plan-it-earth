import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

/*
Event object structure:

event {
    id: calendarApi.getEvents().length + 1,     // Unique Identifier, doesnt need to be printed
    title: title.value,     // Title of the event
    start: start,           // Date and time of the event given in Javascripts Date() object
    groupId: label.value,   // A label of the type of activity it is
    extendedProps: {
        alarm: alarm.value, // Value of how many minutes before an event a user has an alarm for, -1 if no alarm
        image: imageUrl,    // May contain a URL of user submitted image - blank if no image
        description: description.value  // May contain description of notes - blank if no description
    },
}
*/

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const exportEventArray = async (eventsArray) => {
    // Sort eventsArray by start date
    eventsArray.sort((a, b) => a.start - b.start);

    let docDefinition = {
        content: [],
        defaultStyle: {
            alignment: 'center',
            fontSize: 16, // Increase the default font size
            margin: [10, 10, 10, 10], // Add some padding around the text
            color: '#333333' // Use a dark gray color for the text
        },
        styles: {
            title: {
                fontSize: 24, // Make the title larger
                bold: true,
                margin: [0, 0, 0, 20], // Add more space below the title
                color: '#000000' // Use black color for the title
            },
            date: {
                fontSize: 18, // Make the date larger
                margin: [0, 0, 0, 15], // Add more space below the date
                color: '#666666' // Use a lighter gray color for the date
            },
            image: {
                margin: [0, 0, 0, 15] // Add more space below the image
            },
            description: {
                margin: [0, 0, 0, 15], // Add more space below the description
                color: '#333333' // Use a dark gray color for the description
            },
            labelAndAlarm: {
                margin: [0, 0, 0, 15], // Add more space below the label and alarm
                color: '#333333' // Use a dark gray color for the label and alarm
            }
        }
    };

    for (const event of eventsArray) {
        // Create a new content block for each event
        const eventContent = [];

        // Title
        eventContent.push({ text: event.title, style: 'title' });

        // Date and time or all day label
        const date = event.start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
        const time = event.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const dateTime = `${date}, ${time}`;
        eventContent.push({ text: dateTime, style: 'date' });

        // Image (if available)
        if (event.extendedProps.image !== '' && event.extendedProps.image !== undefined) {
            // Convert image url to base64 string
            const addImageToDoc = async () => {
                const response = await fetch(event.extendedProps.image);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64String = reader.result;
                        eventContent.push({ image: base64String, width: 250, style: 'image'});
                        resolve();
                    };
                    reader.onerror = reject;
                });
            };
            await addImageToDoc();
        }

        // Description (if available)
        if (event.extendedProps.description) {
            eventContent.push({ text: event.extendedProps.description, style: 'description' });
        }

        // Label (or blank if label is userEvent) followed by alarm (if available)
        const label = event.groupId === 'UserEvent' ? '' : event.groupId;
        const alarm = event.extendedProps.alarm;
        const labelAndAlarm = label + (alarm >= 0 ? ` (Alarm: ${alarm} minutes)` : '');
        eventContent.push({ text: labelAndAlarm, style: 'labelAndAlarm' });

        // Space to make room for the next event
        eventContent.push({ text: '\n\n' });

        // Add the event content to the document
        docDefinition.content.push(eventContent);
    };

    console.log(docDefinition);

    pdfMake.createPdf(docDefinition).download();
}