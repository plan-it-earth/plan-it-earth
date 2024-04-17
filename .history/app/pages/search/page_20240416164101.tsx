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
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get('search') || '';

    useEffect(() => {
        if (!userData) {
            router.push('/');
        }



        const searchNotes = async () => {

            if (!userData) {
                return null;
            }

            const uid = userData.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {

            }
        
        }

    }, [router, userData]);

    return (
        <div>
            <Header />
            <h1>Search</h1>

        </div>
    );
}