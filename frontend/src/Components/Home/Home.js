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
import AddModal from "../Modal/AddModal";
import EditModal from "../Modal/EditModal";
import TaskService from "../../services/task.service";
import UserModal from "../Modal/UserModal";
import UserService from "../../services/user.service";
import AddStatusModal from "../Modal/AddStatusModal";
import Trash from "../../Assets/Home/Trash.svg";
import plusproject from "../../Assets/Home/Plus-project.svg";
import adduser from "../../Assets/Home/UserPlus.svg";
import addtask from "../../Assets/Home/PlusCircle.svg";
import deletetask from "../../Assets/Home/MinusCircle.svg";
import DeleteModal from "../Modal/DeleteModal";

const Home = () => {

    const currentUser = useSelector((state) => state.user);
    const [projectList, setProjectList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const [users, setUsers] = useState([]);

    const [items, setItems] = useState([
        {label: 'Home', icon: send},
        {label: 'Kanban', icon: dashboard},
        {label: 'Settings', icon: filter},
    ]);

    const handleClick = async (projectId) => {
        try {
            const response = await ProjectService.getProjectById(projectId);
            setActiveProject(response.data);
        } catch (error) {
            console.error('Error while fetching project details:', error);
        }
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

    const [showModal, setShowModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('To Do');

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openStatusModal = () => {
        setShowStatusModal(true);
    };

    const closeStatusModal = () => {
        setShowStatusModal(false);
    };

    const handleUsersSubmit = async () => {

    }

    const handleNewTaskSubmit = async () => {
        try {
            const { id: projectId } = activeProject;
            const task = {
                name: newTaskTitle,
                description: newTaskDescription,
                statusName: newTaskStatus,
            };

            const response = await TaskService.addTask(projectId, task);

            const updatedTask = {
                ...task,
                id: response.data.id,
            };

            const updatedProject = { ...activeProject };
            updatedProject.tasks.push(updatedTask);
            setActiveProject(updatedProject);

            closeModal();
        } catch (error) {
            console.error('Error while adding task:', error);
        }
    };

    const handleNewStatusSubmit = async () => {
        try {
            const { id: projectId } = activeProject;
            const task = {
                statusName: newStatus,
            };

            const response = await TaskService.addTask(projectId, task);

            const updatedTask = {
                ...task,
                id: response.data.id,
            };

            const updatedProject = { ...activeProject };
            updatedProject.tasks.push(updatedTask);

            ProjectService.getProjectById(projectId)
                .then((response) => {
                    setActiveProject(response.data);
                    closeStatusModal();
                })
                .catch((error) => {
                    console.error('Error while fetching project details:', error);
                });
        } catch (error) {
            console.error('Error while adding status:', error);
        }
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [showUserModal, setUserModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [username, setUsername] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const openDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const openUserModal = () => {
        setUserModal(true);
    };

    const closeUserModal = () => {
        setUserModal(false);
    };

    const closeEditModal = () => {
        setSelectedTask(null);
        setShowEditModal(false);
    };

    const handleEditTaskSubmit = async (updatedTask) => {
        try {
            const { id: projectId } = activeProject;
            const taskId = updatedTask.id;

            const existingTask = activeProject.tasks.find((task) => task.id === updatedTask.id);
            console.log(existingTask)

            const updatedTaskWithValues = {
                ...existingTask,
                name: updatedTask.name || existingTask.name,
                statusName: updatedTask.statusName || existingTask.statusName,
                description: updatedTask.description || existingTask.description,
            };
            console.log(updatedTaskWithValues)

            await TaskService.editTask(projectId, taskId, updatedTaskWithValues);

            const updatedTasks = activeProject.tasks.map((task) => {
                if (task.id === updatedTask.id) {
                    return updatedTaskWithValues;
                }
                return task;
            });

            setActiveProject((prevProject) => ({
                ...prevProject,
                tasks: updatedTasks,
            }));

            closeEditModal();
        } catch (error) {
            console.error('Error while editing task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await TaskService.deleteTask(taskId);

            const updatedTasks = activeProject.tasks.filter(task => task.id !== taskId);
            setActiveProject(prevProject => ({
                ...prevProject,
                tasks: updatedTasks
            }));
        } catch (error) {
            console.error('Error while deleting task:', error);
        }
    };

    const handleDeleteProject = (projectId) => {
        openDeleteConfirmation();
        setActiveProject(projectList.find(project => project.id === projectId));
    };

    const handleDeleteConfirmation = async (projectId) => {
        try {
            await ProjectService.deleteProject(projectId);
            setProjectList(prevList => prevList.filter(project => project.id !== projectId));
            setActiveProject(null);
            closeDeleteConfirmation();
        } catch (error) {
            console.error('Error while deleting project:', error);
        }
    };

    useEffect(() => {
        ProjectService.getAllProjects().then((response) => {
            console.log(response.data);
            setProjectList(response.data);
            setActiveProject(response.data[0]);
        });
    }, []);

    useEffect(() => {
        UserService.getAllUsers(currentUser.id)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error while fetching users:', error);
            });
    }, []);

    return (
        <div className={'home Regular right'}>
            <Header/>
            <hr></hr>
            <div className={'flex w-full'}>
                <div className={'flex flex-col w-2/12 items-center gap-5 pt-8 kanban-menu h-screen'}>
                    {projectList.map((item) => (
                        <div
                            key={item.id}
                            className={`${
                                activeProject?.id === item.id ? 'bg-blue' : 'bg-gray-300'
                            } flex gap-4 px-4 py-2 rounded cursor-pointer`}
                            onClick={() => handleClick(item.id)}
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
                <div className={'flex flex-col w-10/12'}>
                    {projectList.length === 0 ? <div className={'no-projects'}>
                        <p>No projects yet</p>
                    </div> : (
                        <>
                            {activeProject && activeProject.tasks && activeProject.tasks.length === 0 ? (
                                <div className="no-tasks">
                                    <p>Add new status</p>
                                    <button onClick={openStatusModal} id={'add-first-button'}>
                                        <img src={plusproject} alt={'Add status'} className={'w-6'}/>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={'option-container'}>

                                        <button onClick={() => handleDeleteProject(activeProject.id)} id={'delete-button'}>
                                            Delete project
                                        </button>
                                    </div>
                                    <div className={'project-name'}>
                                        <h1>{activeProject.name}</h1>
                                    </div>
                                    <div className={'task-container'}>
                                        {activeProject && (
                                            <>
                                                {Object.entries(activeProject.tasks.reduce((tasksByStatus, task) => {
                                                    if (!tasksByStatus[task.statusName]) {
                                                        tasksByStatus[task.statusName] = [];
                                                    }
                                                    tasksByStatus[task.statusName].push(task);
                                                    return tasksByStatus;
                                                }, {})).map(([statusName, tasks]) => (
                                                    <div key={statusName} className={'task-column'}>
                                                        <h1>{statusName}</h1>
                                                        <div className={'tasks'}>
                                                            {tasks
                                                                .filter((task) => task.name !== null && task.description !== null)
                                                                .map((task) => (
                                                                    <div
                                                                        className={'task'}
                                                                        key={task.id}
                                                                        onClick={(e) => {
                                                                            if (!e.target.classList.contains('delete-button')) {
                                                                                openEditModal(task);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <h2>{task.name}</h2>
                                                                        <p>{task.description}</p>
                                                                        <div className={'task-footer gap-3'}>
                                                                            <button onClick={(e) => {e.stopPropagation(); handleDeleteTask(task.id);}} className="delete-button">
                                                                                <img src={Trash} alt={'Delete task'} className={'w-6'}/>
                                                                            </button>
                                                                            <button onClick={(e) => {e.stopPropagation(); openUserModal();}}>
                                                                                <img src={adduser} alt={'Add user'} className={'w-6'}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            <button onClick={openModal} id={'add-button'}>
                                                                <img src={addtask} alt={'Add task'} className={'w-6'}/>
                                                            </button>
                                                        </div>
                                                        <button onClick={() => handleDeleteProject(activeProject.id)} id={'delete-button'}>
                                                            <img src={deletetask} alt={'Delete project'} className={'w-6'}/>
                                                        </button>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        <div className={'add-status'}>
                                            <button onClick={openStatusModal} id={'add-button-big'}>
                                                <img src={addtask} alt={'Add status'} className={'w-6'}/>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit}/>}
                {showModal && <AddModal
                    onClose={closeModal}
                    onSubmit={handleNewTaskSubmit}
                    statusList={Array.from(new Set(activeProject.tasks.map((task) => task.statusName)))}
                    projectName={newTaskTitle}
                    setProjectName={setNewTaskTitle}
                    projectDescription={newTaskDescription}
                    setProjectDescription={setNewTaskDescription}
                    projectStatus={newTaskStatus}
                    setProjectStatus={setNewTaskStatus}
                />}
                {showStatusModal && <AddStatusModal
                    onClose={closeStatusModal}
                    onSubmit={handleNewStatusSubmit}
                    statusName={newStatus}
                    setStatusName={setNewStatus}
                />}
                {showUserModal && (<UserModal
                    onClose={closeUserModal}
                    onSubmit={handleUsersSubmit}
                    usersList={users}
                    username={username}
                    setUsername={setUsername}
                />)}
                {showEditModal && (
                    <EditModal
                        onClose={closeEditModal}
                        onSubmit={handleEditTaskSubmit}
                        task={selectedTask}
                        setTask={setSelectedTask}
                        statusList={Array.from(new Set(activeProject.tasks.map((task) => task.statusName)))}
                    />
                )}
                {showDeleteConfirmation && (
                    <DeleteModal
                        activeProject={activeProject}
                        handleDeleteConfirmation={handleDeleteConfirmation}
                        closeDeleteConfirmation={closeDeleteConfirmation}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
