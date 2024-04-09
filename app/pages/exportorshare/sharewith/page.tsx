'use client'
import Header from '../../../Components/Header';
import Exportorshareicon from '../../Images/exportorshareicon.png';
import Pagewhite from '../../Images/pagewhite.png';
import Image from 'next/image';
import Sharewhite from '../../Images/sharewhite.png';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Home() {
    return (
        <div>
            <Header />
            <div>
                share page
            </div>
        </div>
    );
}
