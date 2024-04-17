'use client';
import React, { useState, useContext } from 'react';
import Header from '../../../Components/Header';
import Image from 'next/image';
import Exportorshareicon from '../../../Images/exportorshareicon.png';
import UserContext from '../../../lib/firebase/UserContext';
import { doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recipientEmail, setRecipientEmail ] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const { userData } = useContext(UserContext);

  const handleStartDateClick = (date) => {
    setStartDate(date.target.value);
  };
  
  const handleEndDateClick = (date) => {
    setEndDate(date.target.value);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setRecipientEmail(email);
  };

  const validateEmail = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid) {
      // share calendar with the recipient
      const uid = userData.uid;
      const docRef = doc(db, "users", uid);
    }
  }

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
      <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6">Pick a date range to share</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 max-w-md pt-8 px-10 border border-white bg-[#1A1926] rounded-md justify-center mx-auto">
          <div className="flex flex-col w-full gap-2">
            <label>Share with:</label>
            <input type="text" placeholder="johndoe@gmail.com" onChange={handleEmailChange} onBlur={validateEmail} className="bg-[#35334D] px-3 py-2 rounded-md focus:outline-none"/>
            {!emailValid && <p className="text-red-500 text-sm">Please enter a valid email</p>}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>From:</label>
            <input type="date" required className="text-white bg-gray-600 px-3 py-2 rounded-md cursor-pointer focus:outline-none" onChange={handleStartDateClick}/>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>To:</label>
            <input type="date" required className="text-white bg-gray-600 px-3 py-2 rounded-md cursor-pointer focus:outline-none" onChange={handleEndDateClick}/>
          </div>
          <div className="flex w-full mt-2 pb-4">
            <button type="submit" className="w-full bg-[#35334D] text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none">Share</button>
          </div>
        </div>
      </form>
    </div>
  );
  
}
