import React, {useContext} from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import UserContext from '../lib/firebase/UserContext';
import { auth, db } from '../../firebaseConfig';

import { onAuthStateChanged } from 'firebase/auth';

userData = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        userData = user;
    } else {
        userData = null;
    }
});

export const storeEvents = async (userData, calendarRef) => {
    const calendarApi = calendarRef.current.getApi();
    const eventArray = calendarApi.getEvents();

    if(!eventArray) {
        console.log('no events to store');
        return;
    }

    const eventJson = JSON.stringify(eventArray.filter(event => event.groupId !== 'defaultEvents'));

    if (userData) {
        const uid = userData.uid;
        await updateDoc(doc(db, "users", uid), {
            events: eventJson
        });
    }
};

export const fetchEvents = async (userData) => {
    console.log('fetching events');
    let events = null;

    if (userData) {
        const uid = userData.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            events = docSnap.data().events;
        } else {
            console.log("No such document!");
        }
    } else {
        console.log('user not signed in');
    }        
    return events;
};