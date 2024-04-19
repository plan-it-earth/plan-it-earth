import Image from 'next/image';
import { useCalendarApi } from '../lib/Context/CalendarProvider';
import trash from '../Images/trash.png';
import { deleteEvent } from '../lib/Hooks/dbActions';
import UserContext from '../lib/firebase/UserContext';
import { useContext } from 'react';

export default function EventModal({ id, groupId, title, label, description, alarm, image, onClose }) {
    const { calendarApi } = useCalendarApi();
    const { userData } = useContext(UserContext);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const deleteEventModal = () => {
        calendarApi.getEventById(id).remove();
        deleteEvent(id, userData);
        onClose();
    };

    const formatAlarmTime = (minutes) => {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        const remainingMinutes = minutes % 60;
        
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} before`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} before`;
        } else if (days === 0 && hours === 0 && remainingMinutes === 0) {
            return `at time of event`;
        } else {
            return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} before`;
        }


    };


    
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" onClick={onClose}>
            <div className="relative flex flex-col md:flex-row bg-[#35334D] text-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3 border-white border" onClick={stopPropagation}>
                <div className="p-6 flex-grow items-center gap-2">
                    {groupId !== "" && <Image className="cursor-pointer hover:opacity-90" src={trash} alt={"delete"} height={20} width={20} onClick={deleteEventModal} />}
                    <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
                    {label && <p className="mb-1 text-center">Type: {label}</p>}
                    {description && <p className="mb-1 text-center">Description: {description}</p>}
                    {alarm && alarm !== "-1" && <p className="mb-1 text-center">Alarm: {formatAlarmTime(parseInt(alarm))}</p>}
                    {image && (
                        <div className="flex mt-4 justify-center">
                            <Image src={image} alt="Event image" height={500} width={500} className="rounded-md"/>
                        </div>
                    )}
                </div>
                <span className="absolute top-2 right-2 cursor-pointer text-2xl mr-2" onClick={onClose}>&times;</span>
            </div>
        </div>
    );
}