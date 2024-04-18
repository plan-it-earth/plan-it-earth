'use client';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import Header from '../../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import UserContext from '../../../lib/firebase/UserContext';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebaseConfig';
import { fetchEventsByID } from '@/app/lib/Hooks/dbActions';

export default function ViewShared() {
  const { userData } = useContext(UserContext);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedCalendarData, setSelectedCalendarData] = useState(null);
  const [sharedCalendars, setSharedCalendars] = useState([]);
  
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

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <div className="max-w-md mx-auto px-2 mt-16">
        <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">
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
        {selectedCalendarData && (
          <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
            <div className="p-8">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={selectedCalendarData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


//This is old code of typing an email in and viewing the calendar they shared incase we need it again.

// 'use client';
// import React, { useState } from 'react';
// import Header from '../../../Components/Header';
// import Image from 'next/image';
// import Exportorshareicon from '../../../Images/exportorshareicon.png';
// import { FaPlus } from 'react-icons/fa';

// export default function Home() {
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [error, setError] = useState('');

//   const handleEmailChange = (e) =>{
//     setRecipientEmail(e.target.value);
//     setError(''); 
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add your email validation logic here
//     if (!isValidEmail(recipientEmail)) {
//       setError('Invalid email address. Please enter a valid email from an authorized domain.');
//       return;
//     }

//     console.log('Form submitted with recipient email:', recipientEmail);
//     // Add any further logic for handling form submission here
//   }

//   // Function to validate email format and domain
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return false;
//     }

//     // Check if the email domain is authorized
//     const authorizedDomains = ['example.com', 'example.org']; 
//     const domain = email.split('@')[1];
//     if (!authorizedDomains.includes(domain)) {
//       return false;
//     }

//     return true;
//   }
  
//   return (
//     <div className="bg-[#16141C] min-h-screen">
//       <Header />
//       <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
//       <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">View calendar shared with you</h2>
//       <div className="max-w-md mx-auto mt-16">
  
//         {/* Email Input Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-8 bg-[#1A1926] rounded-lg shadow-md">
//             <div className="p-8">
//               <input
//                 type="email"
//                 placeholder="Enter the email of the calendar you want to view"
//                 value={recipientEmail}
//                 onChange={handleEmailChange}
//                 className="block w-full text-sm font-medium text-gray-700 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm px-8">{error}</p>} 
//           </div>
  
//           {/* Submit Button */}
//           <div className="text-center">
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
