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
            <div className="flex justify-center">
                <div className="max-w-md mr-8 py-12 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col items-center justify-center buttonexportpage" href={{pathname: './exportorshare/sharewith'}}>
                        <Image src={Sharewhite} alt="white share arrow" height={80} width={80} />
                        <span>Share</span>
                    </Link> 
                </div>
                <div className="max-w-md mr-8 p-8 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col items-center justify-center buttonexportpage" href={{pathname: './exportorshare/export'}}>
                        <Image src={Pagewhite} alt="white page icon" height={80} width={80} />
                        <span>Export as pdf</span>
                    </Link>
                </div>
                <div className="max-w-md p-8 bg-[#1A1926] rounded-lg shadow-md">
                    <Link className="flex flex-col items-center justify-center buttonexportpage" href={{pathname: './exportorshare/viewshared'}}>
                        <Image src={ViewShared} alt="view shared" height={80} width={80} />
                        <span>View Shared</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
