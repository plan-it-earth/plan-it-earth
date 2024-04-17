'use client';
import Header from '../../Components/Header';
import Exportorshareicon from '../../Images/exportorshareicon.png';
import Pagewhite from '../../Images/pagewhite.png';
import Image from 'next/image';
import Sharewhite from '../../Images/sharewhite.png';
import '../../globals.css';
import ViewShared from '../../Images/viewshared.png'
import Link from 'next/link';

export default function Home() {
    return (
        <div className="bg-[#16141C] min-h-screen">
            <Header />
            <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
            <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6">Export or Share</h2>
            <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row justify-center gap-10 pb-6">
                <div className="w-52 h-52 p-12 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col gap-4 items-center justify-center buttonexportpage" href={{pathname: './exportorshare/sharewith'}}>
                        <Image src={Sharewhite} alt="white share arrow" height={80} width={80} />
                        <span>Share</span>
                    </Link> 
                </div>
                <div className="p-12 w-52 h-52 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col gap-4 items-center justify-center" href={{pathname: './exportorshare/export'}}>
                        <Image src={Pagewhite} alt="white page icon" height={80} width={80} />
                        <span>Export as pdf</span>
                    </Link>
                </div>
                <div className="w-52 h-52 p-12 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col gap-4 items-center justify-center buttonexportpage" href={{pathname: './exportorshare/viewshared'}}>
                        <Image src={ViewShared} alt="view shared" height={80} width={80} />
                        <span>View Shared</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
