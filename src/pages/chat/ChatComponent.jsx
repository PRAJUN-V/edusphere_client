import React from 'react';
import ChatRoom from './ChatRoom';

function ChatComponent() {
  const roomName = "test-room"; // Replace with dynamic room name if necessary
  const userId = 3; // Replace with the actual user ID

  return (
    <div className="App">
      <ChatRoom roomName={roomName} userId={userId} />
    </div>
  );
}

export default ChatComponent