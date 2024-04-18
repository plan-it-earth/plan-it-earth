import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

// Gets array of events from calendarApi, converts the array to json, 
// and stores the json in the users firestore document
export const storeEvents = async (userData, calendarApi) => {
    if (!userData) {
        console.log('No user signed in or calendarRef is null');
        return;
    }
    
    const eventArray = calendarApi.getEvents();

    if (!eventArray) {
        console.log('No events to store');
        return;
    }

    const eventJson = JSON.stringify(eventArray.filter(event => event.groupId !== ''));

    const uid = userData.uid;
    await updateDoc(doc(db, "users", uid), {
        events: eventJson
    });
};


// Returns an array of the users events using the Event object structure
// event {
//     id               // Unique Identifier
//     title            // Title of the event
//     start            // Date and time of the event given in Javascripts Date() object
//     groupId          // A label of the type of activity it is
//     extendedProps: {
//         alarm        // Value of how many minutes before an event a user has an alarm for, -1 if no alarm
//         image        // May contain a URL of user submitted image - blank if no image
//         description  // May contain description of notes - blank if no description
//     },
// }
export const fetchEvents = async (userData) => {
    if (!userData) {
        console.log('User not signed in');
        return null;
    }

    const uid = userData.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        // Convert the json string to an array of events
        return JSON.parse(docSnap.data().events);
    } else {
        console.log("No such document!");
        return null;
    }
};

export const fetchEventsByID = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        // Convert the json string to an array of events
        return JSON.parse(docSnap.data().events);
    } else {
        console.log("No such document!");
        return null;
    }
};

export const deleteEvent = async (id, userData) => {
    const uid = userData.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let events = JSON.parse(docSnap.data().events);
        events = events.filter(event => event.id !== id);
        await updateDoc(docRef, {
            events: JSON.stringify(events)
        });
    } else {
        console.log("No such document!");
    }
}

export const updateAlarm = async (id, alarm, userData) => {
    const uid = userData.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let events = JSON.parse(docSnap.data().events);
        events = events.map(event => {
            if (event.id === id) {
                event.extendedProps.alarm = alarm;
            }
            return event;
        });
        await updateDoc(docRef, {
            events: JSON.stringify(events)
        });
    } else {
        console.log("No such document!");
    }
}