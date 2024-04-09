'use client'
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
    
    return (
        <div className="flex row justify-between mx-4">
            <p>{title}</p>
            <p>{time}</p>
            <select id="alarm" defaultValue={alarm} onChange={updateAlarm}>
                <option value="-1">none</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="60">60 minutes</option>
            </select>
        </div>
    );
};

export default AlarmRow;