import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface CalendarContextType {
    current: React.RefObject<HTMLDivElement>;
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
    );
};

export const useCalendarRef = (): CalendarContextType => {
    const context = useContext(CalendarContext);
    return context;
};