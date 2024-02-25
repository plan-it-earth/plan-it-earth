import React from 'react';
import Image from 'next/image';

import Search from './Search';

import logo from '../Images/headerlogo.png';
import alarm from '../Images/headeralarm.png';
import share from '../Images/headershare.png';

export default function Header() {
    return (
        <div className="flex h-30 w-full px-10 py-5 bg-[#1A1926] shadow">
            <Image src={logo} alt="Plan-It-Earth" height={60} width={60} className="mt-1"/>
            <Search />
            <div>
                <Image src={alarm} alt="Notifications" height={35} width={35} className=""/>
                <Image src={share} alt="Share" height={35} width={35} className=""/>
                <button className="">Sign out</button>
            </div>
        </div>
    )
}