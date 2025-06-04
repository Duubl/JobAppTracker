import React, { useEffect, useState } from 'react';
import './styles/Toast.css';

function Toast({ message, type = 'info', onClose }) {
  const [isExiting, setIsExiting] = useState(false);
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (message && !isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true); // Start exit animation
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, isExiting]);
  
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
        setIsExiting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  if (!message) return null;

return (
    <div className={`toast toast-${type} ${isExiting ? 'exiting' : ''}`} role="alert">
      {message}
    </div>
  );
}

export default Toast;