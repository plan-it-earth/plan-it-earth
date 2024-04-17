'use client';
import React, { useState } from 'react';
import Header from '../../../Components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function ViewShared() {
  // Sample array of shared calendars (replace with actual data)
  const sharedCalendars = [
    { id: 1, email: 'user1@example.com', calendarData: {} },
    { id: 2, email: 'user2@example.com', calendarData: {} },
    { id: 3, email: 'user3@example.com', calendarData: {} },
  ];0

  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedCalendarData, setSelectedCalendarData] = useState(null);

  const handleSelectChange = (e) => {
    const selectedEmail = e.target.value;
    const selectedCalendar = sharedCalendars.find(calendar => calendar.email === selectedEmail);
    setSelectedEmail(selectedEmail);
    setSelectedCalendarData(selectedCalendar ? selectedCalendar.calendarData : null);
    console.log(`Selected email changed to: ${selectedEmail}`);
  };

  return (
    <div className="bg-[#16141C] min-h-screen">
      <Header />
      <div className="max-w-md mx-auto mt-16">
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
                events={selectedCalendarData.events}
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
