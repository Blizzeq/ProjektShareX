import React from 'react';
import Header from "../Header/Header";
import {LinkContainer} from "react-router-bootstrap";
import "./UserMessages.css";

function UserMessages(props) {

    const messages = [
        "Your project 'nazwa' has been deleted.",
        "New message received.",
        "Task completed successfully.",
        // Dodaj inne przykładowe wiadomości tutaj
    ];

    return (
    <div className={'home Regular right'}>
        <Header />
        <hr></hr>
        <div className={'flex h-full items-center justify-center message-content'}>
            <div className={'messages'}>
                {messages.map((message, index) => (
                    <div className={'delete-message'} key={index}>
                        {message}
                    </div>
                ))}
            </div>
        </div>
    </div>

);
}

export default UserMessages;