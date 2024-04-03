'use client'
import React, {useState, useEffect} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter} from 'next/navigation';

import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar'

import '../../Styles/calendar.css';

export default function Calendar() {
    const router = useRouter();

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
        // TO DO: popup modal to add event
    }

    return (
        <div>
            <Header />
            <main className="mt-12">
                <FullCalendar
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
                    events={[
                        {
                            url: 'https://p24-calendars.icloud.com/holiday/US_en.ics',
                            format: 'ics'
                        }
                    ]}
                />
            </main>
        </div>
    )
}