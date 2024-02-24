'use client'

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as firebaseUser } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import UserContext from './UserContext';
import { useRouter } from 'next/navigation';

export interface UserData {
    email: string;
    uid: string;
}

export interface AuthState {
    userData: UserData | null;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router  = useRouter();
    const [userData, setUserData] = useState<AuthState>({ userData: null});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: firebaseUser | null) => {
            try {
                // If user is logged in, get user data from firestore and route to calendar page
                if (user) {
                    const uid = user.uid;
                    const userRef = doc(db, 'users', uid);
                    const unsubscribeUser = onSnapshot(userRef, (doc) => {
                        const userData = doc.exists() ? {...doc.data(), uid} as UserData : null;
                        setUserData({ userData });
                    });
                    router.push('/pages/calendar');
                    return () => unsubscribeUser();
                } else {
                    setUserData({ userData: null });
                    return () => {};
                }
            } catch (error) {
                console.log("Error getting user data: ", error);
            }
        });
        return () => unsubscribe();
    }, [router]);
    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    )
}