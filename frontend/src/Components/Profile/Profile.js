import React from 'react';
import './Profile.css';
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
        <div className={'home Regular right'}>
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
                    <div className={'flex h-full items-center justify-center profile-content'}>
                        <div className={'profile'}>
                            <div className={'flex py-4 px-4'}>
                                <div className={'text-xl w-3/12'}>
                                    <p className={'px-2 py-2'}>Username</p>
                                </div>
                                <div className={'text-base w-9/12'}>
                                    <input type="text" placeholder={'John Doe'} className={'input-profile px-2 py-2 w-full'}/>
                                    <p className={'px-2 py-2'}>Edit username</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={'flex py-4 px-4'}>
                                <div className={'text-xl w-3/12'}>
                                    <p className={'px-2 py-2'}>First name</p>
                                </div>
                                <div className={'text-base w-9/12'}>
                                    <input type="text" placeholder={'John Doe'} className={'input-profile px-2 py-2 w-full'}/>
                                    <p className={'px-2 py-2'}>Edit First name</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={'flex py-4 px-4'}>
                                <div className={'text-xl w-3/12'}>
                                    <p className={'px-2 py-2'}>Last name</p>
                                </div>
                                <div className={'text-base w-9/12'}>
                                    <input type="text" placeholder={'John Doe'} className={'input-profile px-2 py-2 w-full'}/>
                                    <p className={'px-2 py-2'}>Edit Lirst name</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={'flex py-4 px-4'}>
                                <div className={'text-xl w-3/12'}>
                                    <p className={'px-2 py-2'}>Password</p>
                                </div>
                                <div className={'text-base w-9/12'}>
                                    <input type="password" placeholder={'Password'} className={'input-profile px-2 py-2 w-full'}/>
                                    <p className={'px-2 py-2'}>Edit Password</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={'flex justify-end'}>
                                <a href="#" className={'text-white py-2 px-4 rounded mx-4 my-4 border bg-blue '}>Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
