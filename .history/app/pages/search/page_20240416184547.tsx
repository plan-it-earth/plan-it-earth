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
            setLoading(true);
        };
        loadEvents();
    }, [router, userData, searchParams]);

    if (loading) {
        return <div className="flex flex-col">
                    <Header />
                    <h1 className="bg-[#16141C] text-2xl text-center">Loading...</h1>
                </div>;
    }

    return (
        <div>
            <Header />
            <h1>Search</h1>
            {events.length > 0 ? (
                <ul>
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