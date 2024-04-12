import React, { createContext, useContext, useState, ReactNode, RefObject } from 'react';

interface CalendarProviderProps {
    children: ReactNode;
}

interface CalendarContextType {
    calendarApi: any;
    setCalendarApi: (api: any) => void;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
    const [calendarApi, setCalendarApi] = useState<any>(null);

    return (
        <CalendarContext.Provider value={{ calendarApi, setCalendarApi }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarApi = () => {
    const context = useContext(CalendarContext);
    if (context === null) {
        throw new Error('useCalendarRef must be used within a CalendarProvider');
    }
    return context;
};