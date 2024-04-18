'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import Header from '../../Components/Header'; 
import alarm from '../../Images/alarmLogo.png';
import Image from 'next/image';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useCalendarApi } from '../../lib/Context/CalendarProvider';
import AlarmRow from '../../Components/AlarmRow';

export default function Alarm() {
    const router = useRouter();
    const { calendarApi } = useCalendarApi();
    const [events, setEvents] = useState([]);


    useEffect(() => {
        if (calendarApi) {
            const loadEvents = () => {
                const eventsArray = calendarApi.getEvents();
                const filteredEvents = eventsArray.filter((event) => event.extendedProps.alarm >= 0);
                setEvents(filteredEvents);
            };
            loadEvents();
        }
    }, [calendarApi]);

    const formatDate = (date) => {
        const d = new Date(date);
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: true,
        };
        return d.toLocaleString('en-US', options).replace(',', ' @');
    }


    return (
        <div className="bg-[#16141C] h-lvh justify-center">
            <Header />
            <div className="flex justify-center mt-16">
                <Image src={alarm} alt="Alarm" height={100} width={100} />
            </div>
            <div className="flex w-full justify-center">
                <h2 className="font-medium text-3xl mt-6">Edit/View Alarms</h2>
            </div>
            <div className="flex flex-col mx-2 sm:mx-36 md:mx-36 lg:mx-36 py-8 bg-[#1A1926] mt-6 border shadow-lg border-white rounded-md">
                <div className="flex flex-row w-full pb-6 text-xl font-normal justify-around border-b border-b-1 border-white">
                    <h1>Note</h1>
                    <h1>Time</h1>
                    <h1>Alarm</h1>
                </div>
                <div className="flex flex-col w-full gap-6 mt-6 px-4">
                    {events.length > 0 ? (
                        <div className="flex flex-col gap-6 px-4">
                            {events.map(event => (
                                <AlarmRow key={event.id} title={event.title} time={formatDate(event.start)} alarm={event.extendedProps.alarm} id={event.id} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center mt-4">No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
