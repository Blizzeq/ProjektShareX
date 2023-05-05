import React, {useEffect, useState} from 'react';
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
import {LinkContainer} from "react-router-bootstrap";
import Modal from "../Modal/Modal";

const Home = () => {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleProfileClick() {
        setMenuVisible(!isMenuVisible);
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const [items, setItems] = useState([{label: 'Home', icon: send},
        {label: 'Kanban', icon: dashboard},
        {label: 'Settings', icon: filter},]);

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
        console.log('items', items);
    }, [items]);

    return (<div className={'home Regular right'}>
        <div className={'flex justify-between mx-6 h-20'}>
            <div className={'flex gap-12'}>
                <div className={'flex gap-3 items-center'}>
                    <img src={logo} alt={'logo'} className={'logo-home'}/>
                    <p className={'SemiBold text-3xl'}>Share X</p>
                </div>
                <div className={'flex items-center'}>
                    <input type="text" placeholder={'Search...'} className={'input-home'}/>
                    <span className={'input-logo'}></span>
                </div>
            </div>
            <div className={'flex gap-5 justify-evenly user-home items-center relative'}>
                <img src={profilelogo} alt={'profilelogo'} id={'profile-logo'} onClick={handleProfileClick}/>
                <div className={''}>
                    <p className={'text-darkblue'}>John Doe</p>
                    <p className={'text-gray2'}>test@mail.com</p>
                </div>
                {isMenuVisible && (<div className="menu menu--visible">
                    <div>
                        <LinkContainer to={'/profile'}>
                            <li>Profil użytkownika</li>
                        </LinkContainer>
                        <LinkContainer to={'/'}>
                            <li>Wyloguj</li>
                        </LinkContainer>
                    </div>
                </div>)}
            </div>
        </div>
        <hr></hr>
        <div className={'flex w-full'}>
            <div className={'flex flex-col w-2/12 items-center gap-5 pt-8 kanban-menu h-screen'}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={index === activeIndex ? 'bg-blue flex gap-4 px-4 py-2 rounded text-white' : 'bg-gray-300 flex gap-4 px-4 py-2 rounded'}
                        onClick={() => handleClick(index)}
                    >
                        <img src={item.icon} alt={item.label} className={item.label} />
                        <p>{item.label}</p>
                    </div>
                ))}
                <div
                    className={'bg-gray-300 flex gap-4 px-4 py-2 rounded cursor-pointer'}
                    onClick={handleAddProjectClick}
                >
                    <img src={dashboard} alt={'Add project'} className={'w-6'} />
                    <p>Add project</p>
                </div>
            </div>
            <div className={'flex w-10/12 pt-8'}>
                <div className={'flex justify-center w-full'}>
                    <p className={'text-3xl'}>{items[activeIndex].label}</p>
                </div>
            </div>
            {isModalOpen && (<Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />)}
        </div>
    </div>);
};

export default Home;
