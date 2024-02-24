import Image from "next/image";
import UserContext from "./lib/firebase/UserContext";

import { signInWithPopup,  GoogleAuthProvider } from 'firebase/auth';

import logo from './Images/logo.png';
import google from './Images/google.png';

export default function Home() {
  // TODO: if user is logged in, route to calendar page
  
  // continue with google function
  const continueWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
  }

  return (
    <main className="flex h-screen w-screen bg-[#16141C] justify-center">
      <div className="flex flex-col align-middle items-center mt-40 py-10 px-14 bg-[#1A1926] h-fit rounded-lg shadow-md">
        <Image src={logo} alt="Plan-It-Earth Logo" height={80} width={80} className="justify-center"/>
        <h1 className="text-white text-3xl font-medium mt-3">Join Plan-It-Earth Today</h1>
        <div className="flex flex-row bg-[#35334D] items-center mt-5 px-3 h-12 w-full rounded-md justify-between shadow cursor-pointer hover:opacity-90">
          <Image src={google} alt="Google Logo" height={32} width={32} />
          <p className="font-light text-center pr-8">Continue with Google</p>
          <p></p>
        </div>
      </div>
    </main>
  );
}
