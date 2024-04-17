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

export default function Home() {
  const calendarRef1 = useRef(null);
  const calendarRef2 = useRef(null);
  const [isCalendarOpen1, setIsCalendarOpen1] = useState(false);
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const handleDateClick1 = (date) => {
    setSelectedDate1(date);
    setIsCalendarOpen1(false); // Close the calendar dropdown after selecting a date
  };
  
  const handleDateClick2 = (date) => {
    setSelectedDate2(date);
    setIsCalendarOpen2(false); // Close the calendar dropdown after selecting a date
  };
  
  

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    // You can use selectedDate1 and selectedDate2 to generate the PDF between the selected dates
    // For demonstration purpose, let's just console log a message
    console.log('Downloading PDF for the date range:', selectedDate1, 'to', selectedDate2);
  };

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
      <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">Pick a date range to export</h2>
      <div className="max-w-md mx-auto mt-16">
        {/* First Dropdown and Calendar */}
        <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
          <div className="p-8">
            <button
              onClick={() => setIsCalendarOpen1(!isCalendarOpen1)}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {selectedDate1 ? selectedDate1.toISOString().split('T')[0] : 'Select Start Date'}
            </button>
            {selectedDate1 && (
              <p className="mt-4 text-gray-400">Selected Date: {selectedDate1.toLocaleDateString()}</p>
            )}
          </div>
          {isCalendarOpen1 && (
            <div className="bg-black border rounded-lg shadow-md">
             <FullCalendar
                ref={calendarRef1}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                dateClick={(dateInfo) => handleDateClick1(dateInfo.date)}
            />
            </div>
          )}
        </div>

        {/* Second Dropdown and Calendar */}
        <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
          <div className="p-8">
            <button
              onClick={() => setIsCalendarOpen2(!isCalendarOpen2)}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {selectedDate2 ? selectedDate2.toISOString().split('T')[0] : 'Select End Date'}
            </button>
            {selectedDate2 && (
              <p className="mt-4 text-gray-400">Selected Date: {selectedDate2.toLocaleDateString()}</p>
            )}
          </div>
          {isCalendarOpen2 && (
            <div className="bg-black border rounded-lg shadow-md">
             <FullCalendar
            ref={calendarRef2}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            dateClick={(dateInfo) => handleDateClick2(dateInfo.date)}
            />
            </div>
          )}
        </div>

        {/* Download PDF Button */}
        <div className="text-center">
          <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Download Text File
          </button>
        </div>
      </div>
    </div>
  );
}
