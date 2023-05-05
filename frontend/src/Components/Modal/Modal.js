import React, { useState } from 'react';
import dashboard from '../../Assets/Home/Category.svg';
import filter from '../../Assets/Home/Filter.svg';
import send from '../../Assets/Home/Send.svg';

function Modal(props) {
    const { isOpen, onClose, onSubmit } = props;
    const [projectName, setProjectName] = useState("");
    const [projectImage, setProjectImage] = useState("dashboard");

    const handleSubmit = (event) => {
        event.preventDefault();
        let icon;
        if (projectImage === "dashboard") {
            icon = dashboard;
        } else if (projectImage === "filter") {
            icon = filter;
        } else {
            icon = send;
        }
        const newProject = { label: projectName, icon: icon };
        onSubmit(newProject);
        onClose();
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Create new project</h2>
                <form>
                    <div>
                        <label htmlFor="project-name">Project Name</label>
                        <input type="text" id="project-name" name="project-name" onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className={'mt-4'}>
                        <label htmlFor="project-image">Project Image</label>
                        <select id="project-image" name="project-image" onChange={(e) => setProjectImage(e.target.value)}>
                            <option value="dashboard">Dashboard</option>
                            <option value="filter">Filter</option>
                            <option value="send">Send</option>
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-gray2'} onClick={onClose}>Cancel</button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'} onClick={handleSubmit}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
