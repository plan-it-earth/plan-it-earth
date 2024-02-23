import { createContext } from "react";
import { UserData, AuthState } from './AuthProvider';

const UserContext = createContext<AuthState>({ userData: null });

export default UserContext;
