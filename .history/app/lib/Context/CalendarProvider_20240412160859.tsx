import React, { createContext, useContext, useRef } from 'react';

interface CalendarRefContextType {
    current: React.RefObject<HTMLDivElement> | null;
}

interface CalendarRefProviderProps {
    children: React.ReactNode;
}

const CalendarContext = createContext<CalendarRefContextType | null>(null);

export const CalendarProvider = ({ children }) => {
    const calendarRef = useRef<CalendarRefContextType>
}