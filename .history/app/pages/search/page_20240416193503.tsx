'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { fetchEvents } from '../../lib/Hooks/dbActions';

interface Event {
    id: string;
    title: string;
    start: string;
    groupId?: string;
    extependedProps?: {
        alarm?: string;
        image?: string;
        description?: string;
    };
}

export default function Search () {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    useEffect(() => {
        const loadEvents = async () => {

            if (!userData) {
                router.push('/');
                return;
            }

            const fetchedEvents = await fetchEvents(userData);
            const parsedEvents = JSON.parse(fetchedEvents);
            if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
                let title = searchParams.get('search') || '';
                const filteredEvents = parsedEvents.filter((event: Event) => event.title.toLowerCase().includes(title.toLowerCase()));
                setEvents(filteredEvents);
            } else {
                setEvents([]);
            }
            setLoading(false);
        };
        loadEvents();
    }, [router, userData, searchParams]);

    if (loading) {
        return <div className="flex flex-col bg-[#16141C]">
                    <Header />
                    <h1 className="text-2xl text-center mt-16">Loading...</h1>
                </div>;
    }

    return (
        <div className="flex flex-col bg-[#16141C]">
            <Header />
            <h1 className="text-center text-2xl font-medium mt-16">Search Results</h1>
            <div className="flex flex-row justify-center mx-auto mt-8">
                <h3 className="font-medium text-xl mb-4">Select start and end date</h3>
                <label className="">Start:</label>
                <input type="date" className="w-full text-center mt-2 h-10 mb-6 mx-auto bg-[#1A1926] text-white rounded-lg shadow-lg border-none focus:outline-none" />
                <label>End:</label>
                <input type="date" className="w-full text-center mt-2 h-10 mb-6 mx-auto bg-[#1A1926] text-white rounded-lg shadow-lg border-none focus:outline-none" />
            </div>
            {events.length > 0 ? (
                <div>
                    <ul className="flex flex-col mt-6 items-center px-6 py-6 w-fit mx-auto gap-4 bg-[#35334D] text-white border-white border rounded-lg shadow-lg">
                        {events.map((event: Event) => (
                            <li key={event.id}>{event.title} @ {event.start}</li>
                        ))}
                    </ul>
                    <div className="flex justify-center mx-auto">
                        <button onClick={handleSubmit} className="mt-8 mx-auto w-fit bg-blue-500 text-white font-medium py-2 px-10 rounded-lg hover:bg-opacity-90 focus:outline-none" type="button">Download PDF</button>
                    </div>
                </div>
            ) : (
                <p>No events found.</p>
            )}    
        </div>
    );
}