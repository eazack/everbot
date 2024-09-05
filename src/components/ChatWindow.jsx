import { 
    Avatar,
    ChatContainer, 
    ConversationHeader, 
    MainContainer, 
    Message,
    MessageInput, 
    MessageList,
    TypingIndicator
} from "@chatscope/chat-ui-kit-react";

export const ChatWindow = ({messages = [], botActive = false, onSend}) => {
    return (
        <MainContainer>
            <ChatContainer>
                <ConversationHeader>
                    <Avatar name="EverBot" 
                            src="favicon.ico" 
                            status="available" />
                    <ConversationHeader.Content userName="EverBot"
                                                info="Your friendly neighborhood EA Support Chatbot" />
                </ConversationHeader>

                <MessageList typingIndicator={ botActive ? <TypingIndicator content="I'm thinking..." /> : "" }>
                    {messages.map( msg =>
                        <Message key={msg._id} model={msg} />
                    )}
                </MessageList>

                <MessageInput placeholder="Ask away!" 
                              onSend={onSend}/>
            </ChatContainer>
        </MainContainer>
    )
}