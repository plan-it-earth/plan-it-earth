'use client'
import React, {useEffect} from 'react';
import Header from '../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '../../Styles/calendar.css';

export default function Calendar() {
    useEffect(() => {
        if ()
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