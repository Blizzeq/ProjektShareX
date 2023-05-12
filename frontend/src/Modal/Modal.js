import React, { useState } from 'react';
import dashboard from '../Assets/Home/Category.svg';
import filter from '../Assets/Home/Filter.svg';
import send from '../Assets/Home/Send.svg';
import Project from "../models/project";
import {useSelector} from "react-redux";
import ProjectService from "../services/project.service";
import './Modal.css';

function Modal(props) {
    const currentUser = useSelector(state => state.user);

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

        const project = new Project(projectName, currentUser?.id);

        ProjectService.createProject(project)
            .then(() => {
                console.log(project);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });


    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Create new project</h2>
                <form>
                    <div className={'project-name-container'}>
                        <label htmlFor="project-name">Project Name</label>
                        <input type="text" id="project-name" name="project-name" onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className={'mt-4 project-name-container'}>
                        <label htmlFor="project-image">Project Image</label>
                        <select id="project-image" name="project-image" onChange={(e) => setProjectImage(e.target.value)}>
                            <option value="dashboard">Dashboard</option>
                            <option value="filter">Filter</option>
                            <option value="send">Send</option>
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-gray2 bg-gray-300 px-4 py-2 rounded text-darkblue'} onClick={onClose}>Cancel</button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'} onClick={(e) => handleSubmit(e)}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
