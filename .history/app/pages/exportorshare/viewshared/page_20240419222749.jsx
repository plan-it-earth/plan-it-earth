'use client';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import Header from '../../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import UserContext from '../../../lib/firebase/UserContext';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebaseConfig';
import { fetchEventsByID } from '@/app/lib/Hooks/dbActions';
import Image from 'next/image';
import Exportorshareicon from '../../../Images/exportorshareicon.png';
import EventModal from '../../../Components/EventModal';

export default function ViewShared() {
  const { userData } = useContext(UserContext);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedCalendarData, setSelectedCalendarData] = useState(null);
  const [sharedCalendars, setSharedCalendars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
 
  // Returns an array of strings consisting of emails 
  // that have shared their calendar with the current user
  const getSharedCalendars = useCallback(async () => {
    const sharedCalendars = [];
    const uid = userData.uid;
    const q = collection(db, "users", uid, "sharedCalendars");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sharedCalendars.push({
        email: data.email,
      });
    });

  const closeModal = () => {
    setIsModalOpen(false);
};


    return sharedCalendars;
  }, [userData]);

  useEffect(() => {
    getSharedCalendars().then(calendars => setSharedCalendars(calendars));
  }, [getSharedCalendars]);

  // TODO: Fetch the calendar data for the selected email, current solution (The lines using selectedCalendar)
  //       is not the best. Using the given uid, use the fetchEventsByID function to get the calendar data
  //       and set it to selectedCalendarData
  const handleSelectChange = async (e) => {
    const selectedEmail = e.target.value;
    setSelectedEmail(selectedEmail);

    // Fetch the calendar data for the selected email
    const uid = userData.uid;
    const docRef = doc(db, "users", uid, "sharedCalendars", selectedEmail);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
      console.log("Failed to retrieve shared calendar data");
      return;
    }
    const sharedUID = docSnap.data().uid;
    const selectedCalendar = await fetchEventsByID(sharedUID);

    // Set the selected calendar data
    setSelectedCalendarData(selectedCalendar);
  };

  const handleEventClick = async (eventInfo) => {
    const id = eventInfo.event.id;
    const title = eventInfo.event._def.title;
    const groupId = eventInfo.event.groupId;
    const label = eventInfo.event._def.extendedProps.label;
    const description = eventInfo.event._def.extendedProps.description;
    const alarm = eventInfo.event._def.extendedProps.alarm;
    const image = eventInfo.event._def.extendedProps.image;

    setModalData({ id, groupId, title, label, description, alarm, image });
    setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
      <div className="w-full px-2 mx-auto px-2 mt-16">
        <h2 className="flex flex-col text-center items-center justify-center text-2xl font-semibold mb-6 mt-16">
          Select a shared calendar to view
        </h2>
        <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
          <div className="p-8">
            <select
              value={selectedEmail}
              onChange={handleSelectChange}
              className="block w-full text-sm font-medium text-gray-700 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select calendar to view...</option>
              {sharedCalendars.map(calendar => (
                <option key={calendar.id} value={calendar.email}>{calendar.email}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Display shared calendar */}
        {selectedCalendarData && !isModalOpen && (
          <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
            <div className="p-8">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={selectedCalendarData}
                eventClick={handleEventClick}
                eventClassNames={(eventInfo) => `group-${eventInfo.event.groupId}`}
              />
            </div>
          </div>
        )}
        {isModalOpen && <EventModal {...modalData} onClose={closeModal} isTrash={false} />}
      </div>
    </div>
  );
};
