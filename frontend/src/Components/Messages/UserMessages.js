import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import "./UserMessages.css";
import {useSelector} from "react-redux";
import NotificationService from "../../services/notification.service";

function UserMessages(props) {

    const currentUser = useSelector((state) => state.user);
    const [notifications, setNotifications] = useState(null);
    const [headerKey, setHeaderKey] = useState(0);

    const fetchNotifications = async () => {
        try {
            const response = await NotificationService.getAllNotificationsOfUser(currentUser.id);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error while fetching notifications:', error);
        }
    };

    const refreshHeader = () => {
        setHeaderKey((prevKey) => prevKey + 1);
    };

    const handleClick = async (notificationId) => {
        try {
            await NotificationService.changeIsReadToTrue(notificationId);
            fetchNotifications();
            refreshHeader();
        } catch (error) {
            console.error('Error while changing is read to true:', error);
        }
    };

    useEffect(() => {
        NotificationService.getAllNotificationsOfUser(currentUser.id).then((response) => {
            console.log(response.data);
            setNotifications(response.data);
        });
    }, []);

    return (
    <div className={'home Regular right'}>
        <Header key={headerKey} />
        <hr></hr>
        <div className={'flex h-full items-center justify-center message-content'}>
            <div className={'messages'}>
                {notifications !== null &&
                    notifications.map((notification) => (
                        <button
                            className={`delete-message ${!notification.read ? 'unread' : ''}`}
                            key={notification.id}
                            onClick={() => handleClick(notification.id)}
                        >
                            {notification.description}
                        </button>
                    ))}
            </div>
        </div>
    </div>

);
}

export default UserMessages;