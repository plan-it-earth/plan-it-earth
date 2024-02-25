import React from 'react';
import Image from 'next/image';

import Search from './Search';

import logo from '../Images/headerlogo.png';
import alarm from '../Images/headeralarm.png';
import share from '../Images/headershare.png';

export default function Header() {
    return (
        <div className="flex h-24 w-full px-10 py-5 bg-[#1A1926] shadow justify-between">
            <Image src={logo} alt="Plan-It-Earth" height={60} width={60} className="h-35 w-35 mt-1"/>
            <Search />
            <div className="flex flex-row h-full items-center gap-20">
                <Image src={alarm} alt="Notifications" height={35} width={35} className="h-9 w-9 align-bottom"/>
                <Image src={share} alt="Share" height={35} width={35} className="h-9 w-9"/>
                <button className="px-4 py-2 rounded-sm text-sm font-medium bg-[#E53265]">Sign out</button>
            </div>
        </div>
    )
}