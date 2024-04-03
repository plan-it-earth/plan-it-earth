import React from 'react';
import Image from 'next/image';

import search from '../Images/search.png';

export default function Search() {
    return (
        <div className="flex flex-row h-10 w-20 gap-4 items-center self-center mx-auto bg-[#fff] rounded-lg md:w-96">
            <Image src={search} alt='Search' height={18} width={18} className="h-4 w-4 ml-3 cursor-pointer"/>
            <input type='text' placeholder="Search for your notes here" className="w-full text-black placeholder-gray-600 outline-none border-none"/>
        </div>
    )
}