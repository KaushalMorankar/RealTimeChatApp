import React, { useState, useEffect, createContext, useCallback } from "react";
import { baseURL, chatshere, postrequest } from "../utils/service";
import {io} from "socket.io-client"

export const Chatcontext = createContext();

export const Chatcontextprovider = ({ children, user }) => {
    const [userchat, setuserchat] = useState(null);
    const [error, seterror] = useState(null);
    const [potential, setpotential] = useState([]);
    const [current, setcurrent] = useState(null);
    const [usermessage, setusermessage] = useState(null);
    const [error1, seterror1] = useState(null);
    const [textmessageerror,settextmessageerror]=useState(null);
    const [newmessage,setnewmessage]=useState("");
    const [socket,setsocket] = useState(null);

    // useEffect(()=>{
    //     const newsocket=io("http://localhost:5000");
    //     setsocket(newsocket);

    //     return()=>{
    //         newsocket.disconnect();
    //     }
    // },[user])

    useEffect(() => {
        const getus = async () => {
            try {
                const resp = await chatshere(`${baseURL}/users`);
                if (resp.error) {
                    console.error("Error fetching users", resp);
                    return;
                }
                if (!resp) {
                    console.error("No response received from /users endpoint");
                    return;
                }

                const pchat = resp.filter((u) => {
                    if (user && user._id === u._id) return false;
                    if (userchat) {
                        return !userchat.some((chat) => {
                            return chat.members.includes(u._id);
                        });
                    }
                    return true;
                });
                setpotential(pchat);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        if (user) {
            getus();
        }
    }, [user, userchat]);

    useEffect(() => {
        const getchats = async () => {
            try {
                if (user && user._id) {
                    const resp = await chatshere(`${baseURL}/${user._id}`);
                    if (resp.error) {
                        seterror(resp.message || 'Unknown error');
                    } else {
                        setuserchat(resp);
                    }
                }
            } catch (error) {
                seterror(error.message);
            }
        };

        getchats();
    }, [user]);

    useEffect(() => {
        const getmessage = async () => {
            seterror1(null);
            if (current) {
                console.log('current',current);
                console.log('Fetching messages for chat:', current._id);
                const resp = await chatshere(`${baseURL}/dj/${current._id}`);
                if (resp.error) {
                    console.error("Error fetching messages", resp);
                    seterror1(resp.message || 'Unknown error');
                    return;
                }
                console.log('Messages fetched:', resp);
                setusermessage(resp);
            }
        };
        getmessage();
    }, [current]);

    const textmessage=useCallback(async(text,sender,currentchatID,settext)=>{
        if(!text) return console.log("Atleast type something...:(");

        const resp=await postrequest(`${baseURL}/createmessage`,JSON.stringify({
            chatID:currentchatID,
            sender:sender,
            messages1:text
            })
        );

        if (resp.error) {
            console.error("Error fetching messages", resp);
            settextmessageerror(resp.message || 'Unknown error');
            return;
        }

        setnewmessage(resp);
        setusermessage((prev)=>[...prev,resp]);
        settext("")
    },[])

    const updatechat = useCallback((chat) => {
        console.log('Updating current chat:', chat);
        setcurrent(chat);
    }, []);

    const createchat = useCallback(async (first, second) => {
        const resp = await postrequest(`${baseURL}/createchat`, JSON.stringify({ first, second }));
        if (resp.error) {
            return console.log("Error creating chat", resp);
        }
        setuserchat((prev) => [...prev, resp]);
    }, []);
    // const createchat = useCallback(async (userId, recipientId) => {
    //     try {
    //         const resp = await chatshere(`${baseURL}/createchat`, {
    //             userId,
    //             recipientId
    //         });

    //         if (resp.error) {
    //             seterror(resp.error);
    //         } else {
    //             setuserchat([...userchat, resp]);
    //             setcurrent(resp);
    //         }
    //     } catch (error) {
    //         seterror(error.message);
    //     }
    // },[]);


    return (
        <Chatcontext.Provider value={{ userchat, error, potential, createchat, updatechat, current, usermessage, error1 ,textmessage}}>
            {children}
        </Chatcontext.Provider>
    );
};
