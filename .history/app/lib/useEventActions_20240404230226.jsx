import React, {useContext} from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import UserContext from './firebase/UserContext';
import { auth, db } from '../../firebaseConfig';

export const useEventActions = (calendarRef) => {
    const { userData } = useContext(UserContext);

    const storeEvents = async () => {
        if (!userData) {
            console.log('No user signed in or calendarRef is null');
            return;
        }
        
        const calendarApi = calendarRef.current.getApi();
        const eventArray = calendarApi.getEvents();

        if (!eventArray) {
            console.log('No events to store');
            return;
        }

        const eventJson = JSON.stringify(eventArray.filter(event => event.groupId !== 'defaultEvents'));

        const uid = userData.uid;
        await updateDoc(doc(db, "users", uid), {
            events: eventJson
        });
    };

    const fetchEvents = async () => {
        if (!currentUser) {
            console.log('User not signed in');
            return null;
        }

        const uid = currentUser.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            return docSnap.data().events;
        } else {
            console.log("No such document!");
            return null;
        }
    };

    return { storeEvents, fetchEvents };
};