'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { fetchEvents } from '../../lib/Hooks/dbActions';

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
            if (fetchedEvents) {
                const title = searchParams.get('search') || '';
                const filteredEvents = fetchedEvents.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
            }
        }

        let events = fetchEvents(userData);

        // filter events by title
        events = events.filter(event => event.title.includes(title));


    }, [router, userData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <h1>Search</h1>

        </div>
    );
}