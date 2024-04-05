'use client';
import React, {useState, useEffect, useRef, useContext} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { useRouter} from 'next/navigation';
import { useEventActions } from '../../lib/Hooks/useEventActions';

import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';
import UserContext from '../../lib/firebase/UserContext';

import '../../Styles/calendar.css';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function Calendar() {
    const router = useRouter();
    const calendarRef = useRef(null);
    const { userData } = useContext(UserContext);
    const { storeEvents, fetchEvents } = useEventActions(calendarRef);

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

    return (
        <div>
            <Header />
            <div id="portal-root"></div>
            <main className="mt-12 mx-2 md:mx-10">
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
                    eventSources={[
                        {
                            events: async (fetchInfo, successCallback, failureCallback) => {
                                const events = await fetchEvents();
                                console.log(events);
                                if (events) {
                                    successCallback(JSON.parse(events));
                                } else {
                                    failureCallback();
                                }
                            }
                        },
                        {
                            url: '/US_en.ics',
                            format: 'ics',
                            groupId: 'defaultEvents',
                            failure: function() {console.log('failed to fetch events')},
                        }
                    ]}
                />
            </main>
        </div>
    )
}