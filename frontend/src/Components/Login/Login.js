import React from 'react';
import './Login.css';
import bg from '../../Assets/Login/Graphic Side.svg';
import logo from '../../Assets/Login/Icon1.svg';
import google from '../../Assets/Login/Gmail.svg';
import facebook from '../../Assets/Login/Facebook.svg';
import instagram from '../../Assets/Login/Instagram.svg';
import linkedin from '../../Assets/Login/Linkedin.svg';
import logo2 from '../../Assets/Login/Icon.svg';
import {LinkContainer} from 'react-router-bootstrap'
import Typewriter from 'typewriter-effect';
import {loginSchema} from "../FormValidation/FormValidation";
import {useFormik} from "formik";



const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values)
        },
    });

    return (
        <div className={'login Regular'}>
            <div className={'flex justify-center items-center h-screen w-full'}>
                <div className={'w-6/12'}>
                    <div className={'flex items-center mb-10'}>
                        <img src={logo} alt={'logo'} className={'logo-sm'}/>
                        <p className={'text-3xl pl-2'}>Share X</p>
                    </div>
                    <p className={'SemiBold text-3xl flex justify-center mb-4'}>Sign In</p>
                    <p className={'text-gray flex justify-center mb-4'}>Sign in to stay connected.</p>
                    <form onSubmit={formik.handleSubmit}>
                        <p className={'text-gray2 mb-2'}>Email</p>
                        <input
                            type="text"
                            className={'border border-blue rounded h-8 px-2 w-full'}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}
                        <p className={'text-gray2 mb-2 mt-4'}>Password</p>
                        <input
                            type="password"
                            className={'border border-blue rounded h-8 px-2 w-full'}
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}
                    <div className={'flex justify-between mt-4 mb-6'}>
                        <div className={'flex'}>
                            <input type="checkbox"/>
                            <p className={'text-gray2 ml-2'}>Remember me?</p>
                        </div>
                        <LinkContainer to={'/reset'}>
                            <a className={'text-blue'}>Forgot Password</a>
                        </LinkContainer>
                    </div>
                    <div className={'flex justify-center mb-4'}>
                            <button type={'submit'} className={'bg-blue text-white rounded h-10 w-4/12'}>Sign In</button>
                    </div>
                    </form>
                    <p className={'flex justify-center mb-4'}>or sign in with other accounts?</p>
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
                        <p>Don't have an account?</p>
                        <LinkContainer to={'/register'}>
                            <a className={'text-blue ml-5'}>Click here to sign up.</a>
                        </LinkContainer>
                    </div>
                </div>
            </div>
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
                    <p className={'block'}>with ease on <span className={'SemiBold'}>Share X</span></p>
                </div>
            </div>
            <div>
                <img src={bg} alt={'bg'} className={'absolute top-0 left-1/2 h-screen w-1/2 object-cover'}/>
            </div>
            <div>
                <img src={logo2} alt={'logo'} className={'absolute -top-10 -left-10'}/>
            </div>
        </div>
    );
};

export default Login;
