'use client';
import React from 'react';
import Image from 'next/image';

import search from '../Images/search.png';

export default function Search() {
    return (
        <div className="flex flex-row h-10 w-fit items-center gap-2 self-center mx-1 bg-[#fff] rounded-lg md:w-96 sm:w-80 md:gap-4">
            <Image src={search} alt='Search' height={18} width={18} className="h-4 w-4 ml-2 cursor-pointer md:ml-3"/>
            <input type='text' placeholder="Search your notes" className="w-full text-black placeholder-gray-600 text-xs outline-none border-none md:text-md"/>
        </div>
    )
}