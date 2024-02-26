import React from 'react';
import Image from 'next/image';

import logo from '../Images/headerlogo.png';

export default function Header() {
    return (
        <div className="flex w-full px-10 py-5 bg-[#1A1926] shadow">
            <Image src={logo} alt="Plan-It-Earth" height={0} width={0} />
        </div>
    )
}