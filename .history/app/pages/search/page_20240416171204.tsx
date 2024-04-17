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
    alarm?: string;
    image?: string;
    description?: string;
}

export default function Search () {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!userData) {
            router.push('/');
        }

        const loadEvents = async () => {
            const fetchedEvents = await fetchEvents(userData);
            console.log(fetchedEvents);
            if (fetchedEvents) {
                const title = searchParams.get('search') || '';
                const filteredEvents = fetchedEvents.filter((event: Event) => event.title.toLowerCase().includes(title.toLowerCase()));
                setEvents(filteredEvents);
            } else {
                setEvents([]);
            }
            setLoading(false);
        };
        loadEvents();
    }, [router, userData, searchParams]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <h1>Search</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event: Event) => (
                        <li key={event.id}>{event.title} - {event.date}</li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}    
        </div>
    );
}