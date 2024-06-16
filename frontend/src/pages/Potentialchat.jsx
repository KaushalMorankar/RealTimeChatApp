import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chatcontext } from '../context/chatcontext';
import { Authcontext } from '../context/Authcontext';
import './potential.css'

export default function Potentialchat() {
    const {user} = useContext(Authcontext)
    const {potential, createchat} = useContext(Chatcontext);

    return (
        <div className='all-users'>
            {potential && potential.map((u, index) => (
                <div className='single-user' key={index} onClick={() => {
                    if (user && u._id) {
                        console.log('Creating chat with:', user._id, 'and', u._id);
                        createchat(user._id, u._id); // Pass the correct user IDs
                    } else {
                        console.error('User or recipient ID is missing');
                    }
                }}>
                    {u.name}
                    <span className='user-online'></span>
                </div>
            ))}
        </div>
    );
}