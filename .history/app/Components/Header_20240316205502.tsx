'use client';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

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
    const isMobile = useMediaQuery({ maxWidth: 787 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const renderSearch = () => {
        if (isMobile) {
            return <Search />
        } else {
            const portalRoot = document.getElementById('portal-root');
            if (portalRoot) {
                return ReactDOM.createPortal(
                    <Search />,
                    portalRoot
                );
            }
        }
    };
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
            <Image onClick={routeToCalendar} src={logo} alt="Plan-It-Earth" height={60} width={60} className="h-35 w-35 mt-1 cursor-pointer hover:opacity-85"/>
            <div className="w-52 hidden lg:block"></div>
            {renderSearch()}
            <div className="flex flex-row h-full items-center gap-4 md:gap-20">
                <Image onClick={routeToAlarm} src={alarm} alt="Alarm" height={35} width={35} className="h-8 w-8 cursor-pointer hover:opacity-85"/>
                <Image onClick={routeToExportOrShare} src={share} alt="Share" height={35} width={35} className="h-8 w-8 cursor-pointer hover:opacity-85"/>
                <button onClick={() => logOut()} className="px-5 py-2 rounded-md text-sm font-medium bg-[#E53265] outline-none border-none shadow hover:brightness-110">Sign out</button>
            </div>
        </div>
    )
}