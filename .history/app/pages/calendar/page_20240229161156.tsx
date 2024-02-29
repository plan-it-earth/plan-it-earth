'use client'
import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
    return (
        <div>
            <Header />
            <main className="mt-10">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    headerToolbar={{
                        right: 'dayGridMonth, timeGridWeek, timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                />
            </main>
        </div>
    )
}