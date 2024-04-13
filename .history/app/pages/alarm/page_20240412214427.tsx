'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Calendar } from '@fullcalendar/react';
import { auth } from '../../../firebaseConfig';
import Header from '../../Components/Header'; 
import alarm from '../../Images/alarmLogo.png';
import Image from 'next/image';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Alarm() {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedAlarm, setSelectedAlarm] = useState(5);

    useEffect(() => {
        const parseICS = (icsContent) => {
            const eventDetails = { startTime: new Date(), summary: 'Test Event' };
            setEvents([eventDetails]);
        };

        fetch('path_to_your_ics_file.ics')
            .then(response => response.text())
            .then(data => parseICS(data))
            .catch(error => console.error('Error fetching or parsing ICS file:', error));

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (selectedEvent) {
            const timeUntilEvent = selectedEvent.startTime - new Date() - selectedAlarm * 60000;
            const alarmTimeout = setTimeout(() => {
                console.log('Time for event:', selectedEvent.summary);
            }, timeUntilEvent);
            return () => clearTimeout(alarmTimeout);
        }
    }, [selectedEvent, selectedAlarm]);

    const handleEventSelection = (info) => {
        setSelectedEvent(info.event);
    };

    const handleAlarmSelection = (e) => {
        setSelectedAlarm(parseInt(e.target.value));
    };

    return (
        /*<>*/
        <div className="bg-[#16141C] h-lvh justify-center">
            <Header />
            <div className="flex justify-center mt-16">
                <Image src={alarm} alt="Alarm" height={100} width={100} />
            </div>
            <div className="flex w-full justify-center">
                <h2 className="font-medium text-2xl mt-6">Edit/View Alarms</h2>
            </div>
            <div className="flex max-w-md mx-auto bg-[#1A1926]">
                <div className="flex flex-row w-full justify-between px-4 mx-4">
                    <h1>Note</h1>
                    <h1>Time</h1>
                    <h1>Alarm</h1>
                </div>
            </div>
            {/*
            <div className="logo-container">
                <Image src={alarm} alt="Notifications" height={150} width={150} />
            </div>
            <div className="container">
                <div className="title">Set Alarm for Event</div>
                <div className="content">
                    <div className="row">
                        <div className="label">Notes</div>
                        <div className="info">{events.length > 0 && events[0].summary}</div>
                    </div>
                    <div className="row">
                        <div className="label">Time</div>
                        <div className="info">{events.length > 0 && events[0].startTime.toLocaleString()}</div>
                    </div>
                    <div className="row">
                        <div className="label">Alarm</div>
                        <div className="info">
                            <select onChange={handleAlarmSelection} value={selectedAlarm}>
                                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((minutes) => (
                                    <option key={minutes} value={minutes}>{minutes} minutes before</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
           
            <style jsx>{`
                   .container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 20px;
                    background-color: #16141C;
                    border-radius: 10px;
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    color: white;
                    text-align: center;
                    max-width: 600px; 
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    
                }
                .row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    
                }
                .label {
                    flex: 1;
                    font-weight: bold;
                    
                }
                .info {
                    flex: 2;
                    text-align: left;
                    
                }
                select {
                    max-width: 150px;
                    color: black;
                    
                }
                .logo-container {
                    display: flex;
                    justify-content: center;
                    
                }
                @media (max-width: 600px) {
                    .info {
                        flex: 1;
                        
                    }
                }
            `}</style>
        */}
        </div>
        /*</>*/
    );
}
