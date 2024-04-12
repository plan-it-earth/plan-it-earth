import React, { createContext, useContext, useRef, ReactNode, RefObject } from 'react';

interface CalendarProviderProps {
    children: ReactNode;
}

const CalendarContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
    const calendarRef = useRef<HTMLDivElement>(null!);
    return (
        <CalendarContext.Provider value={calendarRef}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarRef = (): RefObject<HTMLDivElement> => {
    const context = useContext(CalendarContext);
    if (context === null) {
        throw new Error('useCalendarRef must be used within a CalendarProvider');
    }
    return context;
};