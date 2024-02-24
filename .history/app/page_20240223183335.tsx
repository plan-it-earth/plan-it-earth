import Image from "next/image";
import UserContext from "./lib/firebase/UserContext";

import logo from './Images/logo.png';
import google from './Images/google.png';

export default function Home() {
  // TODO: if user is logged in, route to calendar page

  return (
    <main className="flex h-screen w-screen bg-[#16141C] justify-center">
      <div className="flex flex-col align-middle items-center mt-60 py-10 px-14 bg-[#1A1926] h-fit rounded-lg">
        <Image src={logo} alt="Plan-It-Earth Logo" height={80} width={80} className="justify-center"/>
        <h1 className="text-white text-3xl font-medium mt-3">Join Plan-It-Earth Today</h1>
        <div className="flex flex-row bg-[#35334D] items-center mt-5 h-12 w-full rounded-md space-x-6">
          <Image src={google} alt="Google Logo" height={32} width={32}/>
          <p className="font-normal">Continue with Google</p>
        </div>
      </div>
    </main>
  );
}
