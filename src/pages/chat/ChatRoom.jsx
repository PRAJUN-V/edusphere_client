import React, { useState, useEffect } from 'react';

const ChatRoom = ({ roomName, userId }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const chatSocket = new WebSocket(
            `ws://localhost:8000/ws/chat/${roomName}/`
        );

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            if (data.messages) {
                setMessages(data.messages);
            }
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        setSocket(chatSocket);

        return () => chatSocket.close();
    }, [roomName]);

    const sendMessage = () => {
        if (socket && messageInput) {
            socket.send(JSON.stringify({
                'type': 'chat_message',
                'message': messageInput,
                'sender': { 'id': userId }
            }));
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                <h2>Chat Room: {roomName}</h2>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender.username}: </strong>{msg.message}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)} 
                    placeholder="Enter your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
