import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Authcontext } from '../context/Authcontext';
import { Chatcontext } from '../context/chatcontext';
import { baseURL, chatshere } from '../utils/service';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import './chatbox.css'
import InputEmoji from "react-input-emoji"
import { BsSendFill } from "react-icons/bs";

export default function Chatbox({ chat, user1 }) {
    const { user } = useContext(Authcontext);
    const { current, usermessage, textmessage } = useContext(Chatcontext);
    const [recipientuser, setRecipientUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [text,settext]=useState("");

    console.log('text',text);

    const recipientid = chat?.members.find((id) => id !== user1?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientid) return;
            try {
                const resp = await chatshere(`${baseURL}/user/${recipientid}`);
                console.log(recipientid);
                if (resp.error) {
                    setError(resp.error);
                } else {
                    setRecipientUser(resp);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        getUser();
    }, [recipientid]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!chat) return;
            try {
                const resp = await chatshere(`${baseURL}/dj/${chat._id}`);
                if (resp.error) {
                    setError(resp.error);
                } else {
                    setMessages(resp);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchMessages();
    }, [chat]);

    if (!chat) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>No conversation selected yet..</p>
        );
    }

    return (
        <Stack gap={4} className="chat-box">
            <div className='chat-header'>
                <h4>{recipientuser?.name}</h4>
            </div>
            <Stack gap={3} className='messages'>
                {usermessage && usermessage.map((message, index) => (
                    <Stack key={index} className={`${message?.senderID === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
                        <span>{message.messages1}</span>
                        <span className='message-footer'>
                            {moment(message.createdAt).calendar()}
                        </span>
                    </Stack>
                ))}
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
                <InputEmoji value={text} onChange={settext} fontFamily='nunito' borderColor='rgba(72,112,223,0.2)'/>
                <BsSendFill onClick={()=>textmessage(text,user,current._id,settext)}/>
            </Stack>
        </Stack>
    );
}
