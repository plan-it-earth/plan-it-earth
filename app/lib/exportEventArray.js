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
    let docDefinition = {
        content: [],
        styles: {
            title: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            date: {
                fontSize: 14,
                margin: [0, 0, 0, 10]
            },
            image: {
                margin: [0, 0, 0, 10]
            },
            description: {
                margin: [0, 0, 0, 10]
            },
            labelAndAlarm: {
                margin: [0, 0, 0, 10]
            }
        }
    };

    eventsArray.forEach(async event => {
        // Title
        docDefinition.content.push({ text: event.title, style: 'title' });

        // Date and time or all day label
        const dateTime = event.start.toLocaleString();
        const allDay = event.allDay === true;
        const dateLabel = allDay ? 'All Day' : dateTime;
        docDefinition.content.push({ text: dateLabel, style: 'date' });

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
                        console.log(base64String);
                        docDefinition.content.push({ image: base64String, style: 'image' });
                        console.log('Image added to doc');
                        resolve();
                    };
                    reader.onerror = reject;
                });
            };
            await addImageToDoc();
        }
        console.log('Past image check')

        // Description (if available)
        if (event.extendedProps.description) {
            docDefinition.content.push({ text: event.extendedProps.description, style: 'description' });
        }

        // Label (or blank if label is userEvent) followed by alarm (if available)
        const label = event.groupId === 'userEvent' ? '' : event.groupId;
        const alarm = event.extendedProps.alarm;
        const labelAndAlarm = label + (alarm >= 0 ? ` (Alarm: ${alarm} minutes)` : '');
        docDefinition.content.push({ text: labelAndAlarm, style: 'labelAndAlarm' });

        // Space to make room for the next event
        docDefinition.content.push({ text: '\n\n' });
    });

    console.log(docDefinition);

    pdfMake.createPdf(docDefinition).open();
}