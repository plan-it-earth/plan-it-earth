'use client';
import React, {useState, useEffect, useRef, useContext} from 'react';

import { useRouter} from 'next/navigation';
import Link from 'next/link';
import { fetchEvents } from '../../lib/Hooks/dbActions';
import { useCalendarApi } from '../../lib/Context/CalendarProvider'; 

import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';
import UserContext from '../../lib/firebase/UserContext';
import { FaPlus } from 'react-icons/fa';

import EventModal from '../../Components/EventModal.jsx';

import '../../Styles/calendar.css';

export default function Calendar() {
    const router = useRouter();
    const { userData } = useContext(UserContext);
    const calendarRef = useRef(null);
    
    const { setCalendarApi } = useCalendarApi();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    useEffect(() => {
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            setCalendarApi(api);
        }
    }, [calendarRef, setCalendarApi]);

    useEffect(() => {
        // if user is not logged in, redirect to login page
        if (!userData) {
            router.push('/');
        }
    }, [router, userData]);

    const handleDateClick = () => {
        console.log('date clicked');

        // print events to console
        console.log(calendarRef.current.getApi().getEvents());
    }

    const handleEventClick = (eventInfo) => {
        const title = eventInfo.event._def.title;
        const label = eventInfo.event._def.extendedProps.label;
        const description = eventInfo.event._def.extendedProps.description;
        const alarm = eventInfo.event._def.extendedProps.alarm;
        const image = eventInfo.event._def.extendedProps.image;

        setModalData({title, label, description, alarm, image});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#16141C]">
            <Header />
            <main className="mt-12 mx-2 md:mx-10">
                {!isModalOpen && <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventClassNames={(eventInfo) => `group-${eventInfo.event.groupId}`}
                    eventSources={[
                        {
                            events: async (fetchInfo, successCallback, failureCallback) => {
                                const events = await fetchEvents(userData);
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
                            failure: function() {console.log('failed to fetch events')},
                        }
                    ]}
                />}
                {isModalOpen && <EventModal {...modalData} onClose={closeModal} />}
            </main>
            {!isModalOpen && <div className="fixed bottom-5 inset-x-0 flex justify-center z-10">
                <Link className="bg-[#E53265] text-white w-12 h-12 rounded-full flex items-center justify-center"
                      href={{ pathname: '/pages/calendar/createnote' }}>
                    <FaPlus className="text-2xl" />
                </Link>
            </div>}
        </div>
    )
}