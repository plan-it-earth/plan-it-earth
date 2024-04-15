import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

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

export const fetchEvents = async (userData) => {
    if (!userData) {
        console.log('User not signed in');
        return null;
    }

    const uid = userData.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        //console.log(docSnap.data());
        return docSnap.data().events;
    } else {
        console.log("No such document!");
        return null;
    }
};