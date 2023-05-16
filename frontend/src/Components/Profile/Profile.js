import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";
import UserService from "../../services/user.service";
import {useNavigate, useParams} from "react-router-dom";
import User from "../../models/user";
import Header from "../Header/Header";


const Home = () => {
    const currentUser = useSelector(state => state.user);



    const [user, setUser] = useState({
        username: currentUser?.username,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        password: currentUser?.password,
    });

    const navigate = useNavigate();



    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUser = () => {
        UserService.changeUserInfo(currentUser?.id, user).then(() => {
            console.log(user);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className={'home Regular right'}>
            <Header/>
            <hr></hr>
            <div className={'flex h-full items-center justify-center profile-content'}>
                <div className={'profile'}>
                    <div className={'flex py-4 px-4'}>
                        <div className={'text-xl w-3/12'}>
                            <p className={'px-2 py-2'}>Username</p>
                        </div>
                        <div className={'text-base w-9/12'}>
                            <input type="text" name="username" placeholder={currentUser?.username} className={'input-profile px-2 py-2 w-full'} value={user.username} onChange={(e) => onInputChange(e)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={'flex py-4 px-4'}>
                        <div className={'text-xl w-3/12'}>
                            <p className={'px-2 py-2'}>First name</p>
                        </div>
                        <div className={'text-base w-9/12'}>
                            <input type="text" name="firstName" placeholder={currentUser?.firstName} className={'input-profile px-2 py-2 w-full'} value={user.firstName} onChange={(e) => onInputChange(e)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={'flex py-4 px-4'}>
                        <div className={'text-xl w-3/12'}>
                            <p className={'px-2 py-2'}>Last name</p>
                        </div>
                        <div className={'text-base w-9/12'}>
                            <input type="text" disabled name="lastName" placeholder={currentUser?.lastName} className={'input-profile px-2 py-2 w-full'} value={user.lastName} onChange={(e) => onInputChange(e)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={'flex py-4 px-4'}>
                        <div className={'text-xl w-3/12'}>
                            <p className={'px-2 py-2'}>Old Password</p>
                        </div>
                        <div className={'text-base w-9/12'}>
                            <input type="password" disabled name="password" placeholder={'Old Password'} className={'input-profile px-2 py-2 w-full'} value={''} onChange={(e) => onInputChange(e)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={'flex py-4 px-4'}>
                        <div className={'text-xl w-3/12'}>
                            <p className={'px-2 py-2'}>New Password</p>
                        </div>
                        <div className={'text-base w-9/12'}>
                            <input type="password" disabled name="password" placeholder={'New Password'} className={'input-profile px-2 py-2 w-full'} value={''} onChange={(e) => onInputChange(e)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className={'flex justify-end my-4 mx-4 gap-5'}>
                        <LinkContainer to={'/home'}>
                            <a className={'text-darkblue py-2 px-4 rounded  border bg-gray-300 '}>Cancel</a>
                        </LinkContainer>
                        <button className={'text-white py-2 px-4 rounded border bg-blue '} onClick={() => updateUser()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
