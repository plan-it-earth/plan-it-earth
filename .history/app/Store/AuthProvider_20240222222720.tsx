'use client'

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as firebaseUser } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import UserContext from './UserContext';

export interface UserData {
    email: string;
    uid: string;
}

export interface AuthState {
    userData: UserData | null;
}