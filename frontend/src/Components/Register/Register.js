import React from 'react';
import './Register.css';
import logo from "../../Assets/Login/Icon1.svg";
import google from "../../Assets/Login/Gmail.svg";
import facebook from "../../Assets/Login/Facebook.svg";
import instagram from "../../Assets/Login/Instagram.svg";
import linkedin from "../../Assets/Login/Linkedin.svg";
import graphic from "../../Assets/Register/Graphic Side.svg";
import logo2 from "../../Assets/Register/Logo.svg";
import {LinkContainer} from "react-router-bootstrap";
import Typewriter from "typewriter-effect";
import {useFormik} from "formik";
import {registerSchema} from "../FormValidation/FormValidation";

const Register = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        },
        validationSchema: registerSchema,
        onSubmit: values => {
            console.log(values)
        },
    });

    return (
        <div className={'register Regular'}>
            <div className={'flex justify-center items-center h-screen w-full'}>
                <div className={'w-max text-5xl text-shadow text-white z-10'}>
                    <p>Share your
                        <Typewriter
                            options={{
                                strings: ['projects', 'files', 'photos', 'videos', 'music', 'links', 'notes', 'ideas', 'thoughts', 'stories'],
                                autoStart: true,
                                loop: true,
                            }}
                        /></p>
                    <p>with ease on <span className={'SemiBold'}>Share X</span></p>
                </div>
            </div>
            <div className={'flex justify-center items-center h-screen w-full'}>
                <div className={'w-6/12'}>
                    <div className={'flex items-center mb-10'}>
                        <img src={logo} alt={'logo'} className={'logo-sm'}/>
                        <p className={'text-3xl pl-2'}>Share X</p>
                    </div>
                    <p className={'SemiBold text-3xl flex justify-center mb-4'}>Sign In</p>
                    <p className={'text-gray flex justify-center mb-4'}>Create your Share X account</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={'flex justify-center mb-4'}>
                            <div className={'mr-5'}>
                                <p className={'text-gray2 mb-2'}>First Name</p>
                                <input
                                    type="text"
                                    className={'border border-blue rounded h-8 px-2 w-full'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName || ''}
                                    name="firstName"
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="error">{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <p className={'text-gray2 mb-2'}>Last Name</p>
                                <input
                                    type="text"
                                    className={'border border-blue rounded h-8 px-2 w-full'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName || ''}
                                    name="lastName"
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="error">{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={'flex justify-center mb-4'}>
                            <div className={'mr-5'}>
                                <p className={'text-gray2 mb-2'}>Email</p>
                                <input
                                    type="text"
                                    className={'border border-blue rounded h-8 px-2 w-full'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email || ''}
                                    name="email"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="error">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <p className={'text-gray2 mb-2'}>Phone No.</p>
                                <input
                                    type="number"
                                    className={'border border-blue rounded h-8 px-2 w-full'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phoneNo || ''}
                                    name="phoneNo"
                                />
                                {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                    <div className="error">{formik.errors.phoneNo}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={'flex justify-center mb-4'}>
                            <div className={'mr-5'}>
                                <p className={'text-gray2 mb-2'}>Password</p>
                                <input
                                    type="password"
                                    className={'border border-blue rounded h-8 px-2 w-full'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password || ''}
                                    name="password"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="error">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <p className={'text-gray2 mb-2'}>Confirm Password</p>
                                <input type="password" className={'border border-blue rounded h-8 px-2 w-full'}
                                       id="confirmPassword"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.confirmPassword}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="error">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={'flex justify-center mb-4'}>
                            <div>
                                <input type={'checkbox'} className={'mr-2'}
                                       id="agreeToTerms"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       checked={formik.values.agreeToTerms}
                                />
                                <label htmlFor="agreeToTerms" className={'text-gray2'}>I agree with the terms of use</label>
                            </div>
                        </div>
                        <div className={'flex justify-center -mt-5 mb-4'}>
                            {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
                                <div className="error">{formik.errors.agreeToTerms}</div>
                            ) : null}
                        </div>
                        <div className={'flex justify-center mb-6'}>
                            <button type={'submit'} className={'bg-blue text-white rounded h-10 w-4/12'}>Sign Up</button>
                        </div>
                    </form>
                    <p className={'flex justify-center mb-4'}>or sign up with other accounts?</p>
                    <div className={'flex justify-center mb-4 gap-2'}>
                        <LinkContainer to={'/'}>
                            <a>
                                <img src={google} alt={'google'}/>
                            </a>
                        </LinkContainer>
                        <LinkContainer to={'/'}>
                            <a>
                                <img src={facebook} alt={'facebook'}/>
                            </a>
                        </LinkContainer>
                        <LinkContainer to={'/'}>
                            <a>
                                <img src={instagram} alt={'instagram'}/>
                            </a>
                        </LinkContainer>
                        <LinkContainer to={'/'}>
                            <a>
                                <img src={linkedin} alt={'linkedin'}/>
                            </a>
                        </LinkContainer>
                    </div>
                    <div className={'flex justify-center'}>
                        <p className={'mr-2'}>Already have an Account</p>
                        <LinkContainer to={'/'}>
                            <a className={'text-blue'}>Sign in</a>
                        </LinkContainer>
                    </div>
                </div>
            </div>
            <div>
                <img src={graphic} alt={'graphic'} className={'absolute h-screen w-1/2 object-cover top-0'}/>
            </div>
            <div>
                <img src={logo2} alt={'logo'} className={'absolute -top-20 right-0'}/>
            </div>
        </div>
    );
};

export default Register;
