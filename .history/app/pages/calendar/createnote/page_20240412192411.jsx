'use client';
import Header from '../../../Components/Header';
import {useState} from 'react';
import { useRouter} from 'next/navigation';
import { useCalendarApi } from '../../../lib/Context/CalendarProvider';



export default function CreateNote() {

    const router = useRouter();
    const { calendarApi } = useCalendarApi();

    const [formData, setFormData] = useState({title: "",date: "", alarm: "", image: "", label: "", description: ""});
    const handleChange = (event) => {
        const { title, value } = event.target;
        setFormData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var title = document.getElementById("title");
        var date = document.getElementById("date");
        var time = document.getElementById("time");
        var alarm = document.getElementById("alarm");
        var image = document.getElementById("image");
        var label = document.getElementById("label");
        var description = document.getElementById("description");

        alert(
            `Title: ${title.value},
             Date: ${date.value},
             Time: ${time.value},
             Alarm: ${alarm.value},
             Image: ${image.value}, 
             Label: ${label.value}, 
             Description: ${description.value}` 
        );

        /*
        // Add event to calendar
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            title: title.value,
            date: date.value,
            time: time.value,
            alarm: alarm.value,
            image: image.value,
            label: label.value,
            description: description.value
        });
        
        // Add event to database
        storeEvents();
        */

        router.push('/pages/calendar');
    }

    return (

        
        <div className="bg-[#16141C] min-h-screen ">
            <Header />
            <h2 className="flex items-center justify-center text-2xl font-medium mb-6 mt-16">Create Note</h2>
            <div className="max-w-md mx-auto mt-16 p-8 bg-[#1A1926] rounded-lg shadow-md border border-white">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>

                        <label className="block text-sm font-medium text-gray-200">Title:</label>
                        <input
                        id = "title" 
                        type="text" 
                        placeholder="Enter title here..."
                        required
                        value={formData.title} 
                        onChange={handleChange} 
                        className="text-white bg-gray-600 mt-1 px-3 py-2 w-full rounded-md focus:outline-none" />

                        <label className="block text-sm font-sm text-gray-200">From:</label>
                        <div>
                            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} placeholder="Enter date of note" className="text-white bg-gray-600 mt-1 px-3 py-2 w- rounded-md focus:outline-none" />
                            <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} placeholder="12:00" className="text-white bg-gray-600 mt-1 px-3 py-2 rounded-md focus:outline-none"/>
                        </div>
                        
                        <label className="block text-sm font-medium text-gray-200">Select Alarm:</label>
                            <select id="alarm" className="text-white bg-gray-600 mt-1 p-2 rounded-md w-full focus:outline-none">
                                <option disabled ="disabled" selected="selected">none</option>
                                <option value="5">5 minutes before event</option>
                                <option value="10">10 minutes before event</option>
                                <option value="15">15 minutes before event</option>
                                <option value="60">60 minutes before event</option>
                                <option value="-1">none</option>
                            </select>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="block text-sm font-medium text-gray-200">Select Image:</label>
                        <input type="file" id="image" name="image" accept="image/*" className="mt-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Select Label:</label>
                            <select id="label" className="text-white bg-gray-600 mt-1 p-2  rounded-md focus:outline-none">
                                <option disabled ="disabled" selected="selected">none</option>
                                <option value="Assignment">Assignment</option>
                                <option value="Lecture">Lecture</option>
                                <option value="Lab">Lab</option>
                                <option value="OfficeHours">Office Hours</option>
                                <option value="Other">Other</option>
                            </select>
                        
                        <label className="block text-sm font-medium text-gray-200 mt-3">Notes:</label>
                        <textarea 
                            id="description"
                            type="text"
                            rows="4" 
                            cols="30" 
                            className="text-white bg-gray-600 p-2 mt-1 rounded-md focus:outline-none"
                            placeholder ="Enter note description here...">
                        </textarea>
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
