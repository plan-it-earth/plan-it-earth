'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { fetchEvents } from '../../lib/Hooks/dbActions';
import { exportEventArray } from '../../lib/exportEventArray';
import Image from 'next/image';

interface Event {
    id: string;
    title: string;
    start: string;
    groupId?: string;
    extendedProps: {
        alarm: string;
        image: string;
        description: string;
    };
}

export default function Search () {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
        </Suspense>
    );
}

function SearchComponent() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (event: any) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event: any) => {
        setEndDate(event.target.value);
    }



    const handleSubmit = (event: any) => {
        event.preventDefault();
        const updatedEvents = events.map(e => ({
            ...e,
            start: new Date(e.start)
        }));
        exportEventArray(updatedEvents);
    };

    useEffect(() => {
        // get current date
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();
        
        // set start date to 5 years ago
        const fiveYearsAgo = new Date(year - 5, month, day);
        setStartDate(fiveYearsAgo.toISOString().slice(0, 10));

        // set end date to 5 years from now
        const fiveYearsFromNow = new Date(year + 5, month, day);
        setEndDate(fiveYearsFromNow.toISOString().slice(0, 10));
    }, []);

    useEffect(() => {
        const loadEvents = async () => {

            if (!userData) {
                router.push('/');
                return;
            }

            let fetchedEvents = await fetchEvents(userData);

            let title = searchParams.get('search') || '';
            const filteredEvents = (fetchedEvents as Event[]).filter((event) => {
                const eventDate = new Date(event.start).toISOString().slice(0, 10);
                return (!startDate || eventDate >= startDate) && (!endDate || eventDate <= endDate) && event.title.toLowerCase().includes(title.toLowerCase());
            });
            setEvents(filteredEvents);    
            setLoading(false);
        };
        loadEvents();
    }, [router, userData, searchParams, endDate, startDate]);

    if (loading) {
        return <div className="flex flex-col bg-[#16141C]">
                    <Header />
                    <h1 className="text-2xl text-center mt-16">Loading...</h1>
                </div>;
    }

    return (
        <div className="flex flex-col bg-[#16141C]">
            <Header />
            <h1 className="text-center text-2xl font-medium mt-16">Search</h1>
            <div className="flex flex-col justify-center mx-auto mt-16">
                <h3 className="text-xl font-normal mb-4 text-center">Select start and end date</h3>
                <div className="flex flex-row gap-2">
                    <div>
                        <label className="">Start:</label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} className="w-full text-center mt-2 h-10 mb-6 mx-auto bg-[#1A1926] text-white rounded-lg shadow-lg border-none focus:outline-none" />
                    </div>
                    <div>
                        <label>End:</label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} className="w-full text-center mt-2 h-10 mb-6 mx-auto bg-[#1A1926] text-white rounded-lg shadow-lg border-none focus:outline-none" />
                    </div>
                </div>
            </div>
            {events.length > 0 ? (
                <div>
                    <ul className="flex flex-col mt-6 items-center px-6 py-6 w-full mx-auto gap-4 bg-[#35334D] text-white border-white border rounded-lg shadow-lg">
                        {events.map((event: Event) => (
                            <li className="flex items-center gap-4" key={event.id}>{event.title} @ {event.start}
                                {event.extendedProps.image && <Image src={event.extendedProps.image} alt="image" height={50} width={50} />}
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center mx-auto">
                        <button onClick={handleSubmit} className="mt-8 mx-auto w-fit bg-blue-500 text-white font-medium py-2 px-10 rounded-lg hover:bg-opacity-90 focus:outline-none" type="button">Download PDF</button>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-4">No events found.</p>
            )}    
        </div>
    );
}