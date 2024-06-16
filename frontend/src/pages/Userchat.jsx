import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseURL, chatshere } from '../utils/service';
import './userchat.css';
import { Chatcontext } from '../context/chatcontext';

export default function Userchat({ chat, user }) {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);

    const recipientID = chat?.members.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientID) return;

            try {
                // Fetch recipient user details
                const resp = await chatshere(`${baseURL}/user/${recipientID}`);

                if (resp.error) {
                    setError(resp.error);
                } else {
                    setRecipient(resp);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        getUser();
    }, [recipientID]);

    return (
        <div className='d-flex conversation'>
            <div className='me-2'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJxOLfDct_vEPdS-6OsRnS-kDl_HCv5nI2A&s' alt='user avatar' style={{ width: '55px', height: '55px', borderRadius: '50%' }}/>
            </div>
            <div className='text-content'>
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <>
                        <div className='name'>{recipient?.name}</div>
                        <div className='text'>Text Messages</div>
                    </>
                )}
            </div>
            <div className='d-flex flex-column align-items-end'>
                <div className='date'>
                    24-05-2024
                </div>
                <div className='this-user-notifications'>2</div>
                <span className='user-online'></span>
            </div>
        </div>
    );
}
