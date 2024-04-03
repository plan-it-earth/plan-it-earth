'use client';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Search from './Search';

import logo from '../Images/headerlogo.png';
import alarm from '../Images/headeralarm.png';
import share from '../Images/headershare.png';

import { getAuth, signOut } from "firebase/auth";

function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("User signed out");
    }).catch((error) => {
        console.log("Error signing out: ", error);
    });

    console.log("Sign out clicked");
    location.href = "/";
}

export default function Header() {
    const router = useRouter();

    const routeToAlarm = () => {
        router.push('/pages/alarm')
    }

    const routeToExportOrShare = () => {
        router.push('/pages/exportorshare')
    }

    const routeToCalendar = () => {
        router.push('/pages/calendar')
    }

    return (
        <div className="flex h-24 w-full px-5 py-5 bg-[#1A1926] shadow justify-between md:px-10">
            <Image onClick={routeToCalendar} src={logo} alt="Plan-It-Earth" height={60} width={60} className="h-30 w-30 mt-1 cursor-pointer hover:opacity-85 md:h-35 md:h-35"/>
            <div className="w-52 hidden lg:block"></div>
            <Search />
            <div className="flex flex-row h-full items-center gap-4 md:">
                <Image onClick={routeToAlarm} src={alarm} alt="Alarm" height={35} width={35} className="h-8 w-8 cursor-pointer hover:opacity-85"/>
                <Image onClick={routeToExportOrShare} src={share} alt="Share" height={35} width={35} className="h-8 w-8 cursor-pointer hover:opacity-85"/>
                <button onClick={() => logOut()} className="px-3 py-2 rounded-md text-xs font-medium bg-[#E53265] outline-none border-none shadow hover:brightness-110 md:px-5 md:py-2 md:text-sm">Sign out</button>
            </div>
        </div>
    )
}