'use client'

import {useState, useContext} from 'react';
import { updateAlarm } from '../lib/Hooks/dbActions';
import UserContext from '../lib/firebase/UserContext';

type AlarmRowProps = {
    title: string;
    time: string;
    alarm: number;
    id: number;
};

const AlarmRow: React.FC<AlarmRowProps> = ({ title, time, alarm, id }) => {
    
    const [alarmValue, setAlarmValue] = useState(alarm);
    const { userData } = useContext(UserContext);

    const changeAlarm = (event:any) => {
        const newAlarm = event.target.value;
        setAlarmValue(newAlarm);
        updateAlarm(id, newAlarm, userData);
    }

    
    return (
        <div className="flex flex-row gap-4 text-xs sm:text-sm text-center w-full justify-around text-[#A7A7A7] items-center">
            <p className="flex w-40 lg:w-52 lg:ml-2 justify-center text-center">{title}</p>
            <p className="flex w-40 lg:w-52 lg:ml-12 text-center">{time}</p>
            <select id="alarm" defaultValue={alarm} value={alarmValue} onChange={changeAlarm} className="flex w-28 md:w-40 lg:w-56 mr-4 text-center bg-[#35334D] rounded-md shadow-md h-10 px-2 focus:outline-none">
                <option value="-1">none</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="60">60 minutes</option>
                <option value = "1440"> 1 day before event</option>
                <option value = "2880"> 2 days before event</option>
                <option value = "4320"> 3 days before event</option>
                <option value = "5760"> 4 days before event</option>
                <option value = "7200"> 5 days before event</option>
            </select>
        </div>
    );
};

export default AlarmRow;