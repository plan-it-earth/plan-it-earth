'use client'
import Header from '../../Components/Header';
import Exportorshareicon from '../../Images/exportorshareicon.png';
import Pagewhite from '../../Images/pagewhite.png';
import Image from 'next/image';
import Sharewhite from '../../Images/sharewhite.png';
import '../../globals.css';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const routeToShare = () => {
        router.push('./exportorshare/sharewith')
    }

    const routeToExport = () => {
        router.push('./exportorshare/export')
    }

    return (
        
        <div className="bg-[#16141C] min-h-screen">
          <Header />
          <Image src={Exportorshareicon} alt="export share logo" height={100} width={100} className="mx-auto mb-6 mt-16"/>
          <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">Export or Share</h2>
          <div className="flex justify-center">
          <div className="max-w-md mr-8 p-8 bg-[#1A1926] rounded-lg shadow-md">
            <button onClick={routeToShare} className="flex flex-col items-center justify-center buttonexportpage">
            <Image src={Sharewhite} alt="white share arrow" height={100} width={100} />
            <span>Share</span>
            </button>
            </div>
            <div className="max-w-md p-8 bg-[#1A1926] rounded-lg shadow-md">
                <button onClick={routeToExport} className="flex flex-col items-center justify-center buttonexportpage">
                <Image src={Pagewhite} alt="white page icon" height={100} width={100} />
                <span>Export as pdf</span>
                </button>
          </div>
            </div>
        </div>
      )
      
}
