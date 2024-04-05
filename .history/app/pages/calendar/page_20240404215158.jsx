'use client';
import React, {useState, useEffect, useRef, useContext} from 'react';

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
import UserContext from '../../lib/firebase/UserContext'

import '../../Styles/calendar.css';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function Calendar() {
    const router = useRouter();
    const calendarRef = useRef(null);
    const { userData } = useContext(UserContext)

    useEffect(() => {
        // if user is not logged in, redirect to login page
        if (!userData) {
            router.push('/');
        }
    }, [router, userData]);

    const handleDateClick = () => {
        console.log('date clicked');
        // TO DO: route to create note page passing in the data as props or creating new useContext hook
        router.push('/pages/createnote')
        // still needs to pass date to new page
    }

    // TODO: once fetch events is done, move these two functions to a library
    const storeEvents = async () => {
        const calendarApi = calendarRef.current.getApi()
        const eventArray = calendarApi.getEvents();

        if(!eventArray) {
            console.log('no events to store');
            return;
        }

        const eventJson = JSON.stringify(eventArray);

        if (userData) {
            const uid = userData.uid;
            await updateDoc(doc(db, "users", uid), {
                events: eventJson
            });
        }
    }

    const fetchEvents = async () => {
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
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } else {
                console.log('user not signed in');
            }        
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
                            events: async (fetchInfo, successCallback, failureCallback) => {
                                const events = await fetchEvents();
                                console.log(events);
                                if (events) {
                                    successCallback(JSON.parse(events));
                                }
                            }
                        }
                    }
                />
            </main>
        </div>
    )
}