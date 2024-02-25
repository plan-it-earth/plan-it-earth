import React from 'react';
import Image from 'next/image';

import search from '../Images/search.png';

export default function Search() {
    return (
        <div className="flex flex-row mx-auto bg-[#fff] rounded-s-sm">
            <Image src={search} alt='Search' height={18} width={18} />
            <input type='text' placeholder="Search for your notes here" className="rounded-e-sm"/>
        </div>
    )
}