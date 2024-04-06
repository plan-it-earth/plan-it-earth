'use client';
import Header from '../../Components/Header';
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
    }

    return (
        <div>
            <Header />
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" title="title" value={formData.title} onChange={handleChange}/>  


                    <button type="submit">Submit</button>
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