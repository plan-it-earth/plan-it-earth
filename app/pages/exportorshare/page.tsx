'use client';
import Header from '../../Components/Header';
import Exportorshareicon from '../../Images/exportorshareicon.png';
import Pagewhite from '../../Images/pagewhite.png';
import Image from 'next/image';
import Sharewhite from '../../Images/sharewhite.png';
import '../../globals.css';
import ViewShared from '../../Images/viewshared.png'

export default function Home() {
    return (
        <div className="bg-[#16141C] min-h-screen">
            <Header />
            <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16" />
            <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">Export or Share</h2>
            <div className="flex justify-center">
                <div className="max-w-md mr-8 p-8 bg-[#1A1926] rounded-lg shadow-md">
                    <a href="./exportorshare/sharewith" className="flex flex-col items-center justify-center buttonexportpage">
                        <Image src={Sharewhite} alt="white share arrow" height={100} width={100} />
                        <span>Share</span>
                    </a>
                </div>
                <div className="max-w-md mr-8 p-8 bg-[#1A1926] rounded-lg shadow-md">
                    <a href="./exportorshare/export" className="flex flex-col items-center justify-center buttonexportpage">
                        <Image src={Pagewhite} alt="white page icon" height={100} width={100} />
                        <span>Export as pdf</span>
                    </a>
                </div>
                <div className="max-w-md p-8 bg-[#1A1926] rounded-lg shadow-md">
                    <a href="./exportorshare/viewshared" className="flex flex-col items-center justify-center buttonexportpage">
                        <Image src={ViewShared} alt="view shared" height={100} width={100} />
                        <span>View Shared</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
