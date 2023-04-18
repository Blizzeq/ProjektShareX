import React from 'react';
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

const Home = () => {
    return (
        <div className={'home Regular'}>
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
                <div className={'flex gap-5 justify-evenly user-home items-center'}>
                    <img src={notify} alt={'notify'}/>
                    <img src={message} alt={'message'}/>
                    <img src={profilelogo} alt={'profilelogo'} id={'profile-logo'}/>
                    <div className={''}>
                        <p className={'text-darkblue'}>John Doe</p>
                        <p className={'text-gray2'}>test@mail.com</p>
                    </div>
                </div>
            </div>
            <div className={'flex'}>
                <div className={'w-64'}>
                    <hr></hr>
                    <div className={'flex items-center mx-4 mt-6'}>
                        <p className={'px-4 text-gray'}>Home</p>
                    </div>
                    <div className={'flex items-center mx-4 bg-blue rounded px-6 py-2 mt-4 gap-2'}>
                        <img src={dashboard} alt={'dashboard'}/>
                        <p className={'text-white'}>Dashboard</p>
                    </div>
                    <div className={'flex items-center mx-4 rounded px-6 py-2 mt-4 gap-4'}>
                        <img src={filter} alt={'filter'}/>
                        <p className={'text-gray'}>Settings</p>
                        <img src={arrowright} alt={'arrowright'}/>
                    </div>
                    <hr></hr>
                    <div className={'flex items-center mx-4 rounded px-6 py-2 mt-4 gap-4'}>
                        <img src={filter} alt={'filter'}/>
                        <p className={'text-gray'}>Settings</p>
                        <img src={arrowright} alt={'arrowright'}/>
                    </div>
                    <div className={'flex items-center mx-4 rounded px-6 py-2 mt-4 gap-4'}>
                        <img src={filter} alt={'filter'}/>
                        <p className={'text-gray'}>Settings</p>
                        <img src={arrowright} alt={'arrowright'}/>
                    </div>
                    <div className={'flex items-center mx-4 rounded px-6 py-2 mt-4 gap-4'}>
                        <img src={filter} alt={'filter'}/>
                        <p className={'text-gray'}>Settings</p>
                        <img src={arrowright} alt={'arrowright'}/>
                    </div>
                    <div className={'flex items-center mx-4 rounded px-6 py-2 mt-4 gap-4'}>
                        <img src={filter} alt={'filter'}/>
                        <p className={'text-gray'}>Settings</p>
                        <img src={arrowright} alt={'arrowright'}/>
                    </div>
                </div>
                <div className={'w-full'}>
                    <hr></hr>
                    <div className={'bg-home'}>
                        <div className={'flex mx-12 flex-col gap-3 py-12'}>
                            <p className={'text-white Bold text-4xl text-shadow'}>Hello John Doe!</p>
                            <p className={'text-white Regular text-2xl text-shadow'}>Welcome to Share X</p>
                        </div>
                    </div>
                    <div className={'flex mx-20 px-6 py-6 rounded relative -top-10 bg-white shadow justify-between'}>
                        <div className={'flex'}>
                            <div className={'flex'}>
                                <img src={filtericon} alt={'filtericon'} className={'filter-icon'}/>
                                <p className={'text-gray2 Regular'}>Filter by task name...</p>
                            </div>
                        </div>
                        <div className={'flex gap-3 text-gray2'}>
                            <div className={'flex'}>
                                <p>Sort By :</p>
                                <img src={arrowdown} alt={'arrowdown'} className={'arrow-down'}/>
                            </div>
                            <div className={'flex'}>
                                <div className={'flex gap-1'}>
                                    <p>Group By :</p>
                                    <img src={arrowdown} alt={'arrowdown'} className={'arrow-down'}/>
                                </div>
                                <p>Status</p>
                            </div>
                            <div className={'flex'}>
                                <img src={send} alt={'send'} className={'send-icon'}/>
                                <p>Sort By :</p>
                                <img src={arrowdown} alt={'arrowdown'} className={'arrow-down'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-10'}>
                        <div className={'flex justify-between mx-2 w-96 px-6 py-6 rounded shadow task'}>
                            <p>Sprint</p>
                            <img src={threedots} alt={'threedots'}/>
                        </div>
                        <div className={'flex justify-between mx-2 w-96 px-6 py-6 rounded task-dot text-gray'}>
                            <p>Sprint</p>
                            <img src={plus} alt={'plus'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
