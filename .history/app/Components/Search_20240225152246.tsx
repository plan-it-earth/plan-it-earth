import React from 'react';
import Image from 'next/image';

import search from '../Images/search.png';

export default function Search() {
    return (
        <div className="flex flex-row h-10 w-80 items-center self-center mx-auto bg-[#fff] rounded-tl-sm rounded-bl-sm">
            <Image src={search} alt='Search' height={18} width={18} className="h-4 w-4"/>
            <input type='text' placeholder="Search for your notes here" className="outline-none border-none"/>
        </div>
    )
}