import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chatcontext } from '../context/chatcontext';
import { Container } from 'react-bootstrap';
import { Authcontext } from '../context/Authcontext';
import Userchat from './Userchat';
import Potentialchat from './Potentialchat';
import Chatbox from './Chatbox';

export default function Chat() {
    const { user } = useContext(Authcontext);
    const { userchat, error, updatechat, current} = useContext(Chatcontext);

    console.log('Current chat:', current);
    
    return (
        <Container>
            <Potentialchat />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userchat && userchat.length > 0 ? (
                <div style={{ display: 'flex' }}>
                    <div className='list' style={{ flex: '30%' }}>
                        {userchat.map((chat, index) => (
                            <div key={index} onClick={() => updatechat(chat)}>
                                <Userchat chat={chat} user={user} />
                            </div>
                        ))}
                    </div>
                    <div className='chatbox' style={{ flex: '70%' }}>
                        {current ? (
                            <Chatbox chat={current} user1={user} />
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%' }}>Select a conversation to start chatting</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No chats available</p>
            )}
        </Container>
    );
}
