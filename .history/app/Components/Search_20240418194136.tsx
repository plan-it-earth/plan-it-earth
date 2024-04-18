'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter} from 'next/navigation';

import search from '../Images/search.png';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();

    const handleSubmit = (event:any) => {
        event.preventDefault();
        router.push(`/pages/search?search=${encodeURIComponent(searchInput)}`);
    };

    const handleInputChange = (event:any) => {
        setSearchInput(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-row h-10 w-28 items-center gap-2 self-center bg-[#fff] rounded-lg md:w-96 sm:w-80 md:gap-4 md:ml-16">
            <button type="submit" className="border-none bg-none">
                <Image src={search} alt='Search' height={18} width={18} className="h-4 w-4 ml-2 cursor-pointer md:ml-3"/>
            </button>
            <input onChange={handleInputChange} type='text' placeholder="Search your notes" className="w-full text-black placeholder-gray-600 text-xs outline-none border-none md:text-sm"/>
        </form>
    )
}