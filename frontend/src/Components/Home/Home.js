import React, {useEffect, useRef, useState} from 'react';
import './Home.css';
import logo from '../../Assets/Home/Logo.svg';
import notify from '../../Assets/Home/Notification.svg';
import message from '../../Assets/Home/Message.svg';
import profilelogo from '../../Assets/Home/Profile-Icon.svg';
import dashboard from '../../Assets/Home/Category.svg';
import filter from '../../Assets/Home/Filter.svg';
import arrowright from '../../Assets/Home/Arrow-right.svg';
import filtericon from '../../Assets/Home/Filter-Icon.svg';
import arrowdown from '../../Assets/Home/arrow-down.svg';
import send from '../../Assets/Home/Send.svg';
import threedots from '../../Assets/Home/tripple-dots.svg';
import plus from '../../Assets/Home/Plus.svg';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';
import Modal from '../../Modal/Modal';
import Project from '../../models/project';
import ProjectService from '../../services/project.service';
import Header from '../Header/Header';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




const Home = () => {


    const currentUser = useSelector((state) => state.user);

    const [projectList, setProjectList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    const [items, setItems] = useState([
        {label: 'Home', icon: send},
        {label: 'Kanban', icon: dashboard},
        {label: 'Settings', icon: filter},
    ]);

    const [tasks, setTasks] = useState([
        {id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do'},
        {id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress'},
        {id: 3, title: 'Task 3', description: 'Description 3', status: 'Done'},
        {id: 4, title: 'Task 4', description: 'Description 4', status: 'To Do'},
        {id: 5, title: 'Task 5', description: 'Description 5', status: 'In Progress'},
        {id: 6, title: 'Task 6', description: 'Description 6', status: 'Done'},
        {id: 7, title: 'Task 7', description: 'Description 7', status: 'To Do'},
        {id: 8, title: 'Task 8', description: 'Description 8', status: 'In Progress'},
        {id: 9, title: 'Task 9', description: 'Description 9', status: 'Done'},
    ]);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handleAddProjectClick = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = (newProject) => {
        setItems([...items, newProject]);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        ProjectService.getAllProjects().then((response) => {
            console.log(response.data);
            setProjectList(response.data);
        });
    }, []);


    return (
        <div className={'home Regular right'}>
            <Header/>
            <hr></hr>
            <div className={'flex w-full'}>
                <div className={'flex flex-col w-2/12 items-center gap-5 pt-8 kanban-menu h-screen'}>
                    {projectList.map((item, index) => (
                        <div
                            key={item.id}
                            className={
                                index === activeIndex
                                    ? 'bg-blue flex gap-4 px-4 py-2 rounded text-white'
                                    : 'bg-gray-300 flex gap-4 px-4 py-2 rounded'
                            }
                            onClick={() => handleClick(index)}
                        >
                            <p>{item.name}</p>
                        </div>
                    ))}
                    <div className={'bg-gray-300 flex gap-4 px-4 py-2 rounded cursor-pointer'}
                         onClick={handleAddProjectClick}>
                        <img src={dashboard} alt={'Add project'} className={'w-6'}/>
                        <p>Add project</p>
                    </div>
                </div>
                <div className={'flex w-10/12 pt-8'}>
                    <div className={'task-container'}>
                        <div className={'task-column'}>
                            <h1>To Do</h1>
                            <div className={'tasks'}>
                                {/*display all to do tasks*/}
                                {tasks.filter((task) => task.status === 'To Do').map((task) => (
                                    <div className={'task'}>
                                        <h2>{task.title}</h2>
                                        <p>{task.description}</p>
                                        <p>{task.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={'task-column'}>
                            <h1>In Progress</h1>
                            <div className={'tasks'}>
                                {tasks.filter((task) => task.status === 'In Progress').map((task) => (
                                    <div className={'task'}>
                                        <h2>{task.title}</h2>
                                        <p>{task.description}</p>
                                        <p>{task.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={'task-column'}>
                            <h1>Done</h1>
                            <div className={'tasks'}>
                                {tasks.filter((task) => task.status === 'Done').map((task) => (
                                    <div className={'task'}>
                                        <h2>{task.title}</h2>
                                        <p>{task.description}</p>
                                        <p>{task.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit}/>}
            </div>
        </div>
    );
};

export default Home;
