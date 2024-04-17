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
  const [recipientEmail, setRecipientEmail ] = useState('');

  const [emailValid, setEmailValid] = useState(false);

  const handleDateClick1 = (date) => {
    setSelectedDate1(date);
    setIsCalendarOpen1(false); // Close the calendar dropdown after selecting a date
  };
  
  const handleDateClick2 = (date) => {
    setSelectedDate2(date);
    setIsCalendarOpen2(false); // Close the calendar dropdown after selecting a date
  };

  /*
  const handleEmailChange = (e) =>{
    setRecipientEmail(e.target.value);
  }
  */
  const handleDownlaodTXT = () => {
    console.log('Sharing TXT for the date range:', selectedDate1, 'to', selectedDate2, 'for', recipientEmail);
  }
  
  

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    // You can use selectedDate1 and selectedDate2 to generate the PDF between the selected dates
    // For demonstration purpose, let's just console log a message
    console.log('Downloading PDF for the date range:', selectedDate1, 'to', selectedDate2);
  };

  const handleEmailChange = (e:any) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmailValid(emailRegex.test(email));
    setRecipientEmail(email);
  };

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
      <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6">Pick a date range to share</h2>
      <div className="flex flex-col max-w-md py-10 px-10 border border-white bg-[#1A1926] rounded-md justify-center mx-auto">
        <div className="flex flex-col w-full gap-2">
          <label>Share with:</label>
          <input type="text" placeholder="johndoe@gmail.com" onBlur={handleEmailChange} className="bg-[#35334D] px-3 py-2 rounded-md focus:outline-none"/>
          {!emailValid && <p className="text-red-500 text-sm">Please enter a valid email</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label>From:</label>
          <input type="date" required className="text-white bg-gray-600"/>
        </div>
      </div>
     {/*
      
      <div className="max-w-md mx-auto mt-16">
  
        
        <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
          <div className="p-8">
            <input
              type="email"
              placeholder="Enter recipient's email"
              value={recipientEmail}
              onChange={handleEmailChange}
              className="block w-full text-sm font-medium text-gray-700 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
  
        
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
             
            </div>
          )}
        </div>
  
       
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
              
            </div>
          )}
        </div>
  
        
        <div className="text-center">
          <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Share Text File
          </button>
        </div>
        
      </div>
      */}
    </div>
  );
  
}
