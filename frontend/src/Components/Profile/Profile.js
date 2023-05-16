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
import {useFormik} from "formik";
import {profileSchema} from "../FormValidation/FormValidation";


const Home = () => {
    const currentUser = useSelector(state => state.user);



    const [user, setUser] = useState({
        username: currentUser?.username,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        password: currentUser?.password,
    });

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            oldPassword: '',
            newPassword: '',
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {

            console.log(values);
        },
    });


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
                    <form onSubmit={formik.handleSubmit}>
                        <div className={'flex py-4 px-4'}>
                            <div className={'text-xl w-3/12'}>
                                <p className={'px-2 py-2'}>Username</p>
                            </div>
                            <div className={'text-base w-9/12'}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={currentUser?.username}
                                    className={'input-profile px-2 py-2 w-full'}
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="error">{formik.errors.username}</div>
                                ) : null}
                            </div>
                        </div>
                        <hr></hr>
                        <div className={'flex py-4 px-4'}>
                            <div className={'text-xl w-3/12'}>
                                <p className={'px-2 py-2'}>First name</p>
                            </div>
                            <div className={'text-base w-9/12'}>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder={currentUser?.firstName}
                                    className={'input-profile px-2 py-2 w-full'}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="error">{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                        </div>
                        <hr></hr>
                        <div className={'flex py-4 px-4'}>
                            <div className={'text-xl w-3/12'}>
                                <p className={'px-2 py-2'}>Last name</p>
                            </div>
                            <div className={'text-base w-9/12'}>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder={currentUser?.lastName}
                                    className={'input-profile px-2 py-2 w-full'}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="error">{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <hr></hr>
                        <div className={'flex py-4 px-4'}>
                            <div className={'text-xl w-3/12'}>
                                <p className={'px-2 py-2'}>Old Password</p>
                            </div>
                            <div className={'text-base w-9/12'}>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder={'Old Password'}
                                    className={'input-profile px-2 py-2 w-full'}
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                                    <div className="error">{formik.errors.oldPassword}</div>
                                ) : null}
                            </div>
                        </div>
                        <hr></hr>
                        <div className={'flex py-4 px-4'}>
                            <div className={'text-xl w-3/12'}>
                                <p className={'px-2 py-2'}>New Password</p>
                            </div>
                            <div className={'text-base w-9/12'}>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder={'New Password'}
                                    className={'input-profile px-2 py-2 w-full'}
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword ? (
                                    <div className="error">{formik.errors.newPassword}</div>
                                ) : null}
                            </div>
                        </div>
                        <hr></hr>
                        <div className={'flex justify-end my-4 mx-4 gap-5'}>
                            <LinkContainer to={'/home'}>
                                <a className={'text-darkblue py-2 px-4 rounded border bg-gray-300 '}>Cancel</a>
                            </LinkContainer>
                            <button className={'text-white py-2 px-4 rounded border bg-blue '} type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
