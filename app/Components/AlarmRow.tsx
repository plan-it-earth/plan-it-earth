'use client'

import {useState, useContext} from 'react';


type AlarmRowProps = {
    title: string;
    time: string;
    alarm: number;
    id: number;
};

const AlarmRow: React.FC<AlarmRowProps> = ({ title, time, alarm, id }) => {
    
    const updateAlarm = (event:any) => {
        const newAlarm = event.target.value;
        // Update the alarm value in the database
    };

    const [isDateValid, setIsDateValid] = useState(true);


    /*
    const validateDate = () => {
        var currentDate = new Date();
        //var date = event.date.value
        if (date <= currentDate){
            setIsDateValid(true);
        } else {
            setIsDateValid(false);
        }
    }
    */
    
    return (
        <div className="flex row w-full ml-4 justify-around text-[#A7A7A7] items-center">
            <p>{title}</p>
            <p className="">{time}</p>
            <select id="alarm" defaultValue={alarm} /*onBlur={validateDate}*/ onChange={updateAlarm} className="bg-[#35334D] rounded-md shadow-md h-10 px-2 w-fit focus:outline-none">
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
            {isDateValid ? null : <p className="flex text-red-500 text-sm w-full m-1 justify-start">Invalid time</p>}
        </div>
    );
};

export default AlarmRow;