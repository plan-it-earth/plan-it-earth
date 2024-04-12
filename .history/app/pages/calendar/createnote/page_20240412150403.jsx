'use client';
import Header from '../../../Components/Header';
import {useState} from 'react';
import { useRouter} from 'next/navigation';


export default function CreateNote() {

    const router = useRouter();


    const [formData, setFormData] = useState({title: "",date: "", alarm: "", image: "", label: "", description: ""});
    const handleChange = (event) => {
        const { title, value } = event.target;
        //setFormData((prevFormData) => ({...prevFormData, [title]: value}));  <- Might be relevant not sure
        setFormData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(
            `Title: ${formData.title},
             Date: ${formData.date},
             Alarm: ${formData.alarm},
             Image: ${formData.image}, 
             Label: ${formData.label}, 
             Description: ${formData.description}` 
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

        /*
        const onSubmit = async (data: object) => {
            const response = await saveFormData(data)

            if (response.status === 400) {
                // Validation error
            } else if (response.ok){
                // succesful
            } else {
                // unknown error
            }
        }
        */
        router.push('/pages/calendar');
    }

    return (

        
        <div className="bg-[#16141C] min-h-screen ">
            <Header />
            <h2 className="flex items-center justify-center text-2xl font-medium mb-6 mt-16">Create Note</h2>
            <div className="max-w-md mx-auto mt-16 p-8 bg-[#1A1926] rounded-lg shadow-md border border-white">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="shadow-md">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-200 placeholder-[#A7A7A7]">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title of note" className="text-white bg-gray-600 mt-1 px-3 py-2 w-full rounded-md" />
                    </div>
                    <div className="shadow-sm">    
                        <label htmlFor="alarm" className="block text-sm font-medium text-gray-200">Select Alarm:</label>
                            <select id="select" defaultValue="alarmOption5" className="text-white bg-gray-600 mt-1 p-2 rounded-md w-full">
                                <option value="alarmOption1">none</option>
                                <option value="alarmOption2">5 minutes from now</option>
                                <option value="alarmOption3">10 minutes from now</option>
                                <option value="alarmOption4">15 minutes from now</option>
                                <option value="alarmOption5">60 minutes from now</option>
                            </select>
                    </div>
                    <div>
                        <button type="image" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Upload Image</button>
                    </div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-200">Select Label:</label>
                            <select id="select" defaultValue="labelOption1" className="text-white bg-gray-600 mt-1 p-2  rounded-md ">
                                <option value="labelOption1">none</option>
                                <option value="labelOption2">Assignment</option>
                                <option value="labelOption3">Lecture</option>
                                <option value="labelOption4">Lab</option>
                                <option value="labelOption5">Office Hours</option>
                                <option value="labelOption6">Club</option>
                                <option value="labelOption7">Exam</option>
                                <option value="labelOption8">Quiz</option>
                            </select>
                        
                        <label className="block text-sm font-medium text-gray-200">Notes:</label>
                        <textarea 
                            name ="description"
                            rows="4" 
                            cols="30" 
                            htmlFor="note" 
                            className="text-white bg-gray-600 mt-1 p-2  rounded-md"
                            placeholder ="Enter note description here">
                        </textarea>
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
