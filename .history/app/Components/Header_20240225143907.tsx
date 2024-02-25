import React from 'react';
import Image from 'next/image';

import logo from '../Images/logo.png';

export default function Header() {
    return (
        <nav className="flex h-20 w-full px-10 bg-[#1A1926]">
            <Image src={logo} alt="Plan-It-Earth" height={32} width={32} />
        </nav>
    )
}