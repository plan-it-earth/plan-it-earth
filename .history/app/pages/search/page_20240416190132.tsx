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
            <h1 className="text-center text-2xl font-medium mt-16">Search</h1>
            {events.length > 0 ? (
                <ul className="flex flex-col mt-6 items-center p-4 gap-4 bg-[#35334D] text-white rounded-lg shadow-lg">
                    {events.map((event: Event) => (
                        <li key={event.id}>{event.title} - {event.start}</li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}    
        </div>
    );
}