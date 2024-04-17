'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Search () {
    const { userData } = useContext(UserContext);
    const router = useRouter();
    const searchInput = useParams();
    console.log(searchInput);

    useEffect(() => {
        if (!userData) {
            router.push('/');
        }
    })

    return (
        <div>
            <Header />
            <h1>Search</h1>

        </div>
    );
}