import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addMessage } from '../store/ChatSlice';
import Picker from '@emoji-mart/react';

const socket = io.connect('http://localhost:5000');
const botReplies = [
  "Hello! How can I help you?",
  "That's interesting! Tell me more.",
  "I am just a bot, but I am here to chat!",
  "Nice to hear from you!",
  "Can you elaborate on that?"
];

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      dispatch(addMessage(msg));
    });
  }, [dispatch]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, timestamp: new Date().toLocaleTimeString() };
      socket.emit('sendMessage', newMessage);
      dispatch(addMessage(newMessage));
      setMessage('');
      
      // Auto-reply after 2 seconds
      setTimeout(() => {
        const botMessage = { text: botReplies[Math.floor(Math.random() * botReplies.length)], timestamp: new Date().toLocaleTimeString() };
        dispatch(addMessage(botMessage));
      }, 2000);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-container d-flex flex-column align-items-center p-4" style={{ background: 'rgba(0, 0, 0, 0.6)', borderRadius: '15px', backdropFilter: 'blur(10px)', width: '50%', margin: 'auto' }}>
      <h2 className="text-center text-white mb-3">Chat Room</h2>
      <div className="chat-box p-3 mb-3 w-100" style={{ height: '300px', overflowY: 'auto', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className="chat-bubble p-2 mb-2" style={{ background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
            <strong className="text-white" style={{ fontSize: '12px' }}>{msg.timestamp}</strong>
            <p className="text-light mb-0" style={{ fontSize: '14px' }}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-area d-flex w-100 align-items-center">
        <div className="emoji-picker-container position-relative me-2">
          <button className="btn btn-light" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
          {showEmojiPicker && <div className="position-absolute" style={{ bottom: '50px' }}><Picker onEmojiSelect={addEmoji} /></div>}
        </div>
        <input 
          type="text" 
          className="form-control flex-grow-1" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..." 
          style={{ borderRadius: '20px', padding: '10px' }}
        />
        <button className="btn btn-primary ms-2" onClick={sendMessage} style={{ borderRadius: '20px' }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
