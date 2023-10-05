import Message from '@/components/message';
import React, { createContext, useState } from 'react';

const MessageContext = createContext({});

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <MessageContext.Provider value={showMessage}>
      {children}
      {message && <Message type={message.type} text={message.text} />}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
