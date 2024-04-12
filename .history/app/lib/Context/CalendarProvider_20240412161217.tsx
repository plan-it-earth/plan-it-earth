import React, { createContext, useContext, useRef } from 'react';

interface CalendarContextType {
    current: React.RefObject<HTMLDivElement> | null;
}

interface CalendarProviderProps {
    children: React.ReactNode;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
    const calendarRef = useRef<CalendarContextType>(null!);
    return (
        <CalendarContext.Provider value={calendarRef}>
            {children}
        </CalendarContext.Provider>
    )
}