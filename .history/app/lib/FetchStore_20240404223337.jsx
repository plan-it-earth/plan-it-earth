

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