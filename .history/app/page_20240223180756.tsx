import Image from "next/image";
import UserContext from "./lib/firebase/UserContext";

import logo from './Images/logo.png';
import google from './Images/google.png';

export default function Home() {
  // TODO: if user is logged in, route to calendar page

  return (
    <main className="bg-[#16141C] h-screen w-screen">
      <div>
        <Image src={logo} alt="Plan-It-Earth Logo" height={100} width={100}/>
        <h1 className="text-white text-4xl">Join Plan-It-Earth Today</h1>
        <div>
          <Image src={google} alt="Google Logo" height={50} width={50}/>
          <p>Continue with Google</p>
        </div>
      </div>
    </main>
  );
}
