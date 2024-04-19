'use client';
import Header from '../../../Components/Header';
import {useState, useContext} from 'react';
import { useRouter} from 'next/navigation';
import { useCalendarApi } from '../../../lib/Context/CalendarProvider';
import { storeEvents } from '../../../lib/Hooks/dbActions';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserContext from '../../../lib/firebase/UserContext';

const storage = getStorage();

export default function CreateNote() {
    const { userData } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');

    const [time, setTime] = useState('');

    const [isDateValid, setIsDateValid] = useState(true);

    const router = useRouter();
    const { calendarApi } = useCalendarApi();

    const [formData, setFormData] = useState({title: "",date: "", alarm: "", image: "", label: "", description: ""});
    const handleChange = (event) => {
        const { title, value } = event.target;
        setFormData(event.target.value);
    };

    const uploadImage = async (event) => {
        // Upload the image to Firebase storage
        const imageFile = event.target.files[0];
        const storageRef = ref(storage, userData.uid + '/' + (calendarApi.getEvents().length + 1) + '/' + imageFile.name);
        uploadBytes(storageRef, imageFile).then((snapshot) => {
            console.log('Uploaded a blob or file!');

            // Get the download URL of the uploaded image
            getDownloadURL(storageRef).then((url) => {
                setImageUrl(url.toString());
            });
        });
    }


    const handleTimeChange =(event) => {
        setFormData(prev => ({ ...prev, time: event.target.value }));
        setTime(event.target.value);
    };

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateDate(value);
    };

    const validateDate = (inputDate) => {
        const input = new Date(inputDate);
        const currentDate = new Date();
        setIsDateValid(input >= currentDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var title = document.getElementById("title");
        var date = document.getElementById("date");
        var alarm = document.getElementById("alarm");
        var image = document.getElementById("image");
        var label = document.getElementById("label");
        var description = document.getElementById("description");

        if(time.value) {
            let start = new Date(date.value + "T" + time.value);
    
            calendarApi.addEvent({
                id: calendarApi.getEvents().length + 1,
                title: title.value,
                start: start,
                groupId: label.value,
                extendedProps: {
                    alarm: alarm.value,
                    image: imageUrl,
                    description: description.value
                },
            });
        } else {
            // All day event
            let start = new Date(date.value);
    
            calendarApi.addEvent({
                id: calendarApi.getEvents().length + 1,
                title: title.value,
                start: start,
                groupId: label.value,
                allDay: 'true',
                extendedProps: {
                    alarm: alarm.value,
                    image: imageUrl,
                    description: description.value
                },
            });
        }

        console.log(
            `Title: ${title.value},
             Date: ${date.value},
             Alarm: ${alarm.value},
             Image: ${imageUrl}, 
             Label: ${label.value}, 
             Description: ${description.value}` 
        );
        
        // Add event to database
        storeEvents(userData, calendarApi);

        router.push('/pages/calendar');
    }

    return (

        
        <div className="bg-[#16141C] min-h-screen ">
            <Header />
            <h2 className="flex items-center justify-center text-2xl font-medium mt-16">Create Note</h2>
            <div className="max-w-md mx-2 mt-10 p-8 bg-[#1A1926] rounded-lg shadow-md border border-white">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>

                        <label className="block text-sm font-normal text-gray-200">Title:</label>
                        <input
                        id = "title" 
                        type="text" 
                        placeholder="Enter title here..."
                        required
                        value={formData.title} 
                        onChange={handleChange} 
                        className="text-white bg-gray-600 mt-1 px-3 py-2 w-full rounded-md focus:outline-none" />

                        <label className="block text-sm font-normal mt-3 text-gray-200">From:</label>
                        <div className="flex flex-row justify-between gap-4">
                            <input type="date" id="date" name="date" required value={formData.date} onChange={handleDateChange} className="text-white bg-gray-600 mt-1 px-3 py-2 rounded-md w-full dark focus:outline-none" />
                            <input type="time" id="time" name="time" required value={time} onChange={handleTimeChange} className="text-white text-center bg-gray-600 mt-1 px-3 py-2 rounded-md h-full w-full focus:outline-none" />
                            {/*<input type="text" id="time" name="time" value={time} onChange={handleTimeChange} onBlur={validateTime} placeholder="12:00" className="text-white bg-gray-600 mt-1 px-3 py-2 rounded-md w-20 text-center focus:outline-none"/>
                            <select id="am/pm" className="text-white bg-gray-600 mt-1 p-2 rounded-md focus:outline-none">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>*/}
                        </div>
                        {isDateValid ? null : <p className="flex text-red-500 text-sm w-full m-1 justify-start">Invalid date</p>}
                        <div>
                        <label className="block text-sm font-normal mt-3 text-gray-200">Select Alarm:</label>
                            <select id="alarm" className="text-white bg-gray-600 mt-1 p-2 rounded-md w-full focus:outline-none">
                                <option value="-1">none</option>
                                <option value="5">5 minutes before event</option>
                                <option value="10">10 minutes before event</option>
                                <option value="15">15 minutes before event</option>
                                <option value="60">60 minutes before event</option>
                                <option value = "1440"> 1 day before event</option>
                                <option value = "2880"> 2 days before event</option>
                                <option value = "4320"> 3 days before event</option>
                                <option value = "5760"> 4 days before event</option>
                                <option value = "7200"> 5 days before event</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="block text-sm font-normal text-gray-200">Select Image:</label>
                        <input onChange={uploadImage} type="file" id="image" name="image" accept="image/*" className="mt-1 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-normal text-gray-200">Select Label:</label>
                            <select id="label" className="text-white bg-gray-600 mt-1 p-2 w-full rounded-md focus:outline-none">
                                <option value="UserEvent">none</option>
                                <option value="Assignment">Assignment</option>
                                <option value="Lecture">Lecture</option>
                                <option value="Lab">Lab</option>
                                <option value="OfficeHours">Office Hours</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Exam">Exam</option>
                            </select>
                        
                        <label className="block text-sm font-normal text-gray-200 mt-3">Notes:</label>
                        <textarea 
                            id="description"
                            type="text"
                            rows="4" 
                            cols="30" 
                            className="text-white bg-gray-600 px-3 py-2 mt-1 rounded-md w-full focus:outline-none"
                            placeholder ="Enter note description here...">
                        </textarea>
                    </div>
                    <div>
                        <button type="submit" className="bg-[#374fae] text-white w-full px-4 py-2 rounded-md hover:opacity-85 focus:outline-none">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
