import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { ChatWindow } from "./ChatWindow";


export const ChatManager = () => {

    const [messages, setMessages] = useState([]);
    const [botActive, setBotActivity] = useState(false);

    useEffect(() => {
        // Send initial greeting
        if ( messages.length === 0 ) { sendMessage("What can I help you with?"); }
    }, [messages]);
    
    const sendMessage = (text) => {
        var msg = {
            _id: nanoid(),
            message: text,
            direction: "incoming"
        };

        setMessages((messages) => ([...messages, msg]));
        setBotActivity(false);
    };

    const generateResponse = (request) => {
        return "I got your message: " + request;
    };

    const handleMessage = (text) => {
        // Record user message
        var msg = {
            _id: nanoid(),
            message: text,
            direction: "outgoing"
        };
        setMessages((messages) => ([...messages, msg]));
        setBotActivity(true);

        // Respond from the bot
        var response = generateResponse(text);
        setTimeout(() => {sendMessage(response);}, 5000);
    };

    return <ChatWindow messages={messages} botActive={botActive} onSend={handleMessage} />
};