'use client';
import React, {useState, useEffect, useRef} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { useRouter} from 'next/navigation';

import Header from '../../Components/Header';
import Search from '../../Components/Search';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';

import '../../Styles/calendar.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Calendar() {
    const router = useRouter();
    const calendarRef = useRef(null);
    let uid = null;

    useEffect(() => {
        // if user is not logged in, redirect to login page
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            }
        });
    }, [router]);

    const handleDateClick = () => {
        console.log('date clicked');
        // TO DO: route to create note page passing in the data as props or creating new useContext hook
        router.push('/pages/createnote')
        // still needs to pass date to new page
    }

    const storeEvents = async () => {
        const calendarApi = calendarRef.current.getApi()
        const eventArray = calendarApi.getEvents();

        if(!eventArray) {
            console.log('no events to store');
            return;
        }

        const eventJson = JSON.stringify(eventArray);

        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in
              const uid = user.uid;
              
              await setDoc(doc(db, "users", uid), {
                events: eventJson
            });
            }
        });
    }

    const fetchEvents = async () => {
        console.log('fetching events');
        let events = null;
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    events = docSnap.data().events;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } else {
                console.log('user not signed in');
            }
        });
        console.log(events);
        return events;
    }

    return (
        <div>
            <Header />
            <div id="portal-root"></div>
            <main className="mt-12">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateClick}
                    events={
                        {
                            url: '/US_en.ics',
                            format: 'ics',
                            failure: function() {console.log('failed to fetch events')},
                        }
                    }
                    eventSources={
                        {
                            url: fetchEvents(),
                            failure: function() {console.log('failed to fetch events from DB')},
                        }
                    }
                />
            </main>
        </div>
    )
}