import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { ChatWindow } from "./ChatWindow";
import botScript from "../data/bot-script.json";

export const ChatManager = () => {

    const [messages, setMessages] = useState([]);
    const [botMsgCount, setBotMsgCount] = useState(0);
    const [botActive, setBotActivity] = useState(false);

    const botUrl = "";

    useEffect(() => {
        // Send initial greeting
        if ( messages.length === 0 ) { sendMessage("What can I help you with?"); }
    }, []);
    
    const sendMessage = (text) => {
        var msg = {
            _id: nanoid(),
            message: text,
            direction: "incoming"
        };

        setMessages(messages => [...messages, msg]);
        setBotMsgCount(botMsgCount => botMsgCount + 1);
        setBotActivity(false);
    };

    const generateResponse = (request) => {
        var response = "";

        // Check if HTTP endpoint is configured
        if (botUrl.length > 0) {
            console.log("HTTP");
        } else {
            var respCt = Math.min(botMsgCount, botScript.length) - 1;
            response = botScript[respCt].response;
        }

        return response;
    };

    const handleMessage = (text) => {
        // Record user message
        var msg = {
            _id: nanoid(),
            message: text,
            direction: "outgoing"
        };
        setMessages(messages => [...messages, msg]);
        setBotActivity(true);

        // Respond from the bot
        var response = generateResponse(text);
        setTimeout(() => {sendMessage(response);}, 5000);
    };

    return <ChatWindow messages={messages} botActive={botActive} onSend={handleMessage} />
};