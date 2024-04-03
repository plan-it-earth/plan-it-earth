'use client'
import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
    return (
        <div>
            <Header />
            <main>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </main>
        </div>
    )
}