import React, { createContext, useContext, useRef } from 'react';

interface CalendarRefContextType {
    current: any;
}

interface CalendarRefProviderProps {
    children: React.ReactNode;
}

const CalendarContext = createContext<CalendarRefContextType | undefined>(undefined);

export const CalendarProvider = ({ children }) => {
    const calendarRef = useRef<CalendarRefContextType>
}