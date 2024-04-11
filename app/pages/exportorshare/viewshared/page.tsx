'use client';
import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Header from '../../../Components/Header';
import Image from 'next/image';
import Exportorshareicon from '../../../Images/exportorshareicon.png';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import iCalendarPlugin from '@fullcalendar/icalendar';
import UserContext from '../../../lib/firebase/UserContext';
import { FaPlus } from 'react-icons/fa';


export default function viewshared() {
    return (
        <div>
            <Header />
            <div>
            View shared
            </div>
        </div>
    );
}
