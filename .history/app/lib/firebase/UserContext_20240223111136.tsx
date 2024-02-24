import { createContext } from "react";
import { AuthState } from './AuthProvider';

const UserContext = createContext<AuthState>({ userData: null });

export default UserContext;
