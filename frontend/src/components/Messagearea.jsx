import axios from 'axios';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/showToast';

const Messagearea = ({ selectedUser, currentUserId }) => {
  const [messages, setMessages] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/messages/${selectedUser._id}`,
          {
            withCredentials: true,
          },
        );

        setMessages(response.data.data);
      } catch (error) {
        showToast(
          'error',
          error.response?.data?.message || 'Failed to fetch messages',
        );
      }
    };

    fetchMessages();
  }, [selectedUser, apiUrl]);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 custom-scrollbar">
      {messages.map((message) => {
        const isSender =
          message.senderId?.toString() === currentUserId?.toString();

        return (
          <div
            key={message._id}
            className={`flex ${
              isSender ? 'justify-end' : 'items-end gap-2 lg:gap-3'
            }`}
          >
            <div
              className={`
                max-w-[85%] md:max-w-[70%]
                px-4 py-2 lg:px-5 lg:py-3
                rounded-2xl
                text-sm lg:text-[15px]
                ${
                  isSender
                    ? 'bg-cyan-600 rounded-br-none shadow-lg shadow-cyan-900/20 text-white font-medium'
                    : 'bg-white/10 backdrop-blur-md rounded-bl-none'
                }
              `}
            >
              {/* FIXED */}
              {message.message && <p>{message.message}</p>}

              {message.image && (
                <img
                  src={`${apiUrl}/uploads/${message.image}`}
                  alt="chat media"
                  loading="lazy"
                  className="mt-2 max-w-55 max-h-55 lg:max-w-65 lg:max-h-65 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                />
              )}

              {message.createdAt && (
                <span className="text-[10px] text-slate-400 block mt-1 text-right">
                  {new Date(message.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messagearea;
