import Image from "next/image";
import UserContext from "./lib/firebase/UserContext";

import logo from './Images/logo.png';
import google from './Images/google.png';

export default function Home() {
  // TODO: if user is logged in, route to calendar page

  return (
    <main className="flex h-screen w-screen bg-[#16141C] justify-center">
      <div className="flex flex-col align-middle mt-60 py-10 bg-[#1A1926] h-fit rounded-lg gap-6">
        <Image src={logo} alt="Plan-It-Earth Logo" height={100} width={100}/>
        <h1 className="text-white text-4xl">Join Plan-It-Earth Today</h1>
        <div className="flex flex-row bg-[#35334D]">
          <Image src={google} alt="Google Logo" height={50} width={50}/>
          <p>Continue with Google</p>
        </div>
      </div>
    </main>
  );
}
