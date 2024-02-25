import React from 'react';
import Image from 'next/image';

import logo from '../Images/headerlogo.png';

export default function Header() {
    return (
        <nav className="flex h-20 w-full px-10 bg-[#1A1926]">
            <Image src={logo} alt="Plan-It-Earth" height={10} width={10} />
        </nav>
    )
}