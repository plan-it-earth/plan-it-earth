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

export const exportEventArray = (events) => {
    let docDefinition = {
        
    }

    pdfMake.createPdf(docDefinition).open();
}