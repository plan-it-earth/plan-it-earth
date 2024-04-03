'use client'
import React, {useEffect} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter} from 'next/navigation';

import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '../../Styles/calendar.css';

export default function Calendar() {
    useEffect(() => {
        // if user is not logged in, redirect to login page
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            }
        });
    })

    return (
        <div>
            <Header />
            <main className="my-12">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                />
            </main>
        </div>
    )
}