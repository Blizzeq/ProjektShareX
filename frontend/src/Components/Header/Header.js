import React, {useEffect, useState} from 'react';
import logo from "../../Assets/Home/Logo.svg";
import profilelogo from "../../Assets/Home/Profile-Icon.svg";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import './Header.css';
import {clearCurrentUser} from "../../store/actions/user";
import {useNavigate} from "react-router-dom";
import messageIcon from "../../Assets/Home/Envelope.svg"
import ProjectService from "../../services/project.service";
import NotificationService from "../../services/notification.service";

function Header(props) {

    const currentUser = useSelector(state => state.user);
    const [numberNotReadNotification, setNumberNotReadNotification] = useState(null)

    const [isMenuVisible, setMenuVisible] = useState(false);

    function handleProfileClick() {
        setMenuVisible(!isMenuVisible);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/');
    };

    useEffect(() => {
        NotificationService.findNumberNotReadNotification(currentUser.id).then((response) => {
            console.log(response.data);
            setNumberNotReadNotification(response.data);
        });
    }, []);

    return (
        <div className={'flex justify-between mx-6 h-20'}>
            <div className={'flex gap-12'}>
                <LinkContainer to={'/home'} className={'link'}>
                    <div className={'flex gap-3 items-center'}>
                        <img src={logo} alt={'logo'} className={'logo-home'}/>
                        <p className={'SemiBold text-3xl'}>Share X</p>
                    </div>
                </LinkContainer>
                <div className={'flex items-center'}>
                    <input type="text" placeholder={'Search...'} className={'input-home'}/>
                    <span className={'input-logo'}></span>
                </div>
            </div>
            <div className={'flex gap-5 justify-evenly user-home items-center relative'}>
                <img src={profilelogo} alt={'profilelogo'} id={'profile-logo'} onClick={handleProfileClick}/>
                <LinkContainer to={"/messages"}>
                    <div>
                        {numberNotReadNotification !== 0 && (
                            <p id={'user-mesasges-counter'}>{numberNotReadNotification}</p>
                        )}
                        <img src={messageIcon} alt={'usermessage'} id={'user-message'}/>
                    </div>
                </LinkContainer>
                <div className={''}>
                    <p className={'text-darkblue'}>{currentUser?.firstName + ' ' + currentUser?.lastName}</p>
                    <p className={'text-gray2'}>{currentUser?.email}</p>
                </div>
                {isMenuVisible && (<div className="menu menu--visible">
                    <div className={'user-menu'}>
                        <LinkContainer to={'/profile'}>
                            <li>Profil użytkownika</li>
                        </LinkContainer>

                        <li>
                            <button onClick={() => logout()}>Wyloguj</button>
                        </li>

                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Header;