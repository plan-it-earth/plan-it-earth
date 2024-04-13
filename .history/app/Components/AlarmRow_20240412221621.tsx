

export default function AlarmRow (title:string, time:string, alarm:number, id:number) {
    return (
        <div className="flex row">
            <p>{title}</p>
            <p>{time}</p>
            <select id="alarm" defaultValue={alarm}>
                <option value="-1">none</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="60">60 minutes</option>
            </select>
        </div>
    );
}