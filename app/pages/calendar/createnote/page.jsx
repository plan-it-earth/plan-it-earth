'use client';
import Header from '../../../Components/Header';
import {useState} from 'react';

export default function CreateNote() {

    const [formData, setFormData] = useState({title: "",date: "", alarm: "", image: "", label: "", description: ""});
    const handleChange = (event) => {
        const { title, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [title]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(
            `Title: ${formData.title}, Date: ${formData.date}, Alarm: ${formData.alarm}, Image: ${formData.image}, Label: ${formData.label}, Description: ${formData.description}` 
        );

        // Add event to calendar
        /*
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            title: formData.title,
            date: formData.date,
            alarm: formData.alarm,
            image: formData.image,
            label: formData.label,
            description: formData.description
        });
        
        // Add event to database
        storeEvents();*/
    }

    return (
        <div className="black  min-h-screen">
            <Header />
            <h2 className="flex flex-col items-center justify-center text-2xl font-semibold mb-6 mt-16">Create Note</h2>
            <div className="max-w-md mx-auto mt-16 p-8 bg-[#1A1926]  rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                    </div>
                    {/* Add other form fields similarly */}
                    <div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
    /*
    // handles title input box
    const [inputValue,setInputValue] = useState('');
    const handleChange = (event) => {setInputValue(event.target.value);};

    // Handles alarm drop down
    const [selectedAlarmOption, setSelectedAlarmOption] = useState("alarmOption5");
    const handleAlarmDropdownChange = (event) => {setSelectedAlarmOption(event.target.value);};

    // Handles label drop down
    const [selectedLabelOption, setSelectedLabelOption] = useState("labelOption5");
    const handleLabelDropdownChange = (event) => {setSelectedLabelOption(event.target.value);};

    return (
        <div>
            <Header />
            <div>
                <form>
                    <label>Input Event Title:
                    <input type="test" value={inputValue} onChange={handleChange} />
                    </label>
                    <label>Pick Event Date:
                    <input type="test" value={inputValue} onChange={handleChange} />
                    </label>
                </form>
                <label>
                    Select an alarm:
                        <select value={selectedAlarmOption} onChange = {handleAlarmDropdownChange}>
                            <option value="alarmOption1">5 minutes from now</option>
                            <option value="alarmOption2">10 minutes from now</option>
                            <option value="alarmOption3">15 minutes from now</option>
                            <option value="alarmOption4">60 minutes from now</option>
                            <option value="alarmOption5">none</option>
                        </select>
                </label>
                <label>
                    Select a label:
                        <select value={selectedLabelOption} onChange = {handleLabelDropdownChange}>
                            <option value="labelOption1">Assignment</option>
                            <option value="labelOption2">Lecture</option>
                            <option value="labelOption3">Lab</option>
                            <option value="labelOption4">Office Hours</option>
                            <option value="labelOption5">none</option>
                        </select>
                </label>
            </div>
        </div>
    );
}*/
}
