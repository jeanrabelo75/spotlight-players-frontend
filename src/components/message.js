import React, { useState, useEffect } from 'react';

const Message = ({ type, text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`message ${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <p>{text}</p>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        .message {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 20px;
          border-radius: 5px;
          opacity: 0;
          animation: slideIn 0.5s forwards;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          z-index: 999;
        }

        .visible {
          opacity: 1;
        }

        .hidden {
          animation: slideOut 0.5s forwards;
        }

        .error {
          background-color: #ff6b6b;
        }

        .success {
          background-color: #64dd17;
        }
      `}</style>
    </div>
  );
};

export default Message;
