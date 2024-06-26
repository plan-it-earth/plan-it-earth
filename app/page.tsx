'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import { signInWithPopup,  GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';

import logo from './Images/logo.png';
import google from './Images/google.png';

export default function Home() {
  const router = useRouter();

  // route to calendar page if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/pages/calendar');
      }
    });
    return () => unsubscribe();
  }, [router])
  
  // continue with google function
  const continueWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        // if user doesn't exist
        if (!docSnap.exists()) {
          // create new user document
          await setDoc(userDocRef, {
            email: user.email,
            uid: user.uid,
            events: "[]",
          });
        }
        // route to calendar page
        router.push('/pages/calendar');
      }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error: ", errorCode, errorMessage);
      });  
  }

  return (
    <main className="flex h-screen w-screen bg-[#16141C] justify-center">
      <div className="flex flex-col align-middle items-center bg-[#1A1926] border border-gray-500 h-fit mt-48 py-8 px-10 rounded-lg shadow-md md:px-14">
        <Image src={logo} alt="Plan-It-Earth Logo" height={80} width={80} className="justify-center"/>
        <h1 className="text-white text-2xl font-medium mt-3 md:text-3xl">Join Plan-It-Earth Today</h1>
        <div onClick={continueWithGoogle} className="flex flex-row bg-[#35334D] items-center mt-5 px-3 h-12 w-full rounded-md justify-between shadow cursor-pointer hover:opacity-90">
          <Image src={google} alt="Google Logo" height={32} width={32} />
          <p className="font-light text-center pr-8">Continue with Google</p>
          <p></p>
        </div>
      </div>
    </main>
  );
}
