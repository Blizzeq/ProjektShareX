import React, {useState} from 'react';
import logo from "../../Assets/Home/Logo.svg";
import profilelogo from "../../Assets/Home/Profile-Icon.svg";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";
import './Header.css';

function Header(props) {

    const currentUser = useSelector(state => state.user);

    const [isMenuVisible, setMenuVisible] = useState(false);

    function handleProfileClick() {
        setMenuVisible(!isMenuVisible);
    }

    return (
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
                    <p className={'text-darkblue'}>{currentUser?.firstName + ' ' + currentUser?.lastName}</p>
                    <p className={'text-gray2'}>{currentUser?.email}</p>
                </div>
                {isMenuVisible && (<div className="menu menu--visible">
                    <div className={'user-menu'}>
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
    );
}

export default Header;