'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Search () {
    const { userData } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!userData) {
            router.push('/');
        }
        const searchInput = router.query.query;
    })

    return (
        <div>
            <Header />
            <h1>Search</h1>

        </div>
    );
}