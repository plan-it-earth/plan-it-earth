'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import UserContext from '../../lib/firebase/UserContext';
import { db }  from '../../../firebaseConfig';

export default function Search () {
    const { userData } = useContext(UserContext);



    return (
        <div>
            <Header />
            <h1>Search</h1>

        </div>
    );
}