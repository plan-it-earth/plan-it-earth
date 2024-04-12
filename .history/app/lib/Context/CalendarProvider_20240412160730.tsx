import React, { createContext, useContext, useRef } from 'react';

interface CalendarRefContextType {
    current: any;
}

interface CalendarRefProviderProps {
    children: React.ReactNode;
}

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {

}