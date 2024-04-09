'use client';
import Header from '../../../Components/Header';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
    return (
        <div>
            <Header />
            <div>
                Export
            </div>
        </div>
    );
}
