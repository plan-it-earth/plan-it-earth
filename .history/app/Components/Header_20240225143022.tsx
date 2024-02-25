import React from 'react';
import Image from 'next/image';

import logo from '../Images/logo.png';

export default function Header() {
    return (
        <nav>
            <Image src={logo} alt="Plan-It-Earth" height={60} width={60} />
        </nav>
    )
}