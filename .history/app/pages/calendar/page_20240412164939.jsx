'use client';
import React, {useEffect, useRef, useContext} from 'react';

import { useRouter} from 'next/navigation';
import Link from 'next/link';
import { useEventActions } from '../../lib/Hooks/useEventActions';
import { useCalendarApi } from '../../lib/Context/CalendarProvider'; 

import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';
import UserContext from '../../lib/firebase/UserContext';
import { FaPlus } from 'react-icons/fa';

import '../../Styles/calendar.css';

export default function Calendar() {
    const router = useRouter();
    const { userData } = useContext(UserContext);
    const calendarApi = useCalendarApi();
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
            <div className="fixed bottom-5 inset-x-0 flex justify-center z-10">
                <Link className="bg-[#E53265] text-white w-12 h-12 rounded-full flex items-center justify-center"
                      href={{ pathname: '/pages/calendar/createnote' }}>
                    <FaPlus className="text-2xl" />
                </Link>
            </div>
        </div>
    )
}