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

        setMessages(response.data.data || []);
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
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 space-y-4">
      {messages.map((message) => {
        // Sender check
        const isSender =
          String(message.senderId?._id || message.senderId) ===
          String(currentUserId);

        return (
          <div
            key={message._id}
            className={`flex w-full ${
              isSender ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`w-fit max-w-[75%] px-4 py-2 lg:px-5 lg:py-3 rounded-2xl text-sm lg:text-[15px] wrap-break-word whitespace-pre-wrap
                ${
                  isSender
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                    : 'bg-white/10 text-white rounded-bl-none'
                }
              `}
            >
              {/* TEXT MESSAGE */}
              {message.message && (
                <p className="whitespace-pre-wrap">{message.message}</p>
              )}

              {/* IMAGE MESSAGE */}
              {message.image && (
                <img
                  src={message.image}
                  alt="chat media"
                  className="mt-2 max-w-full max-h-60 object-cover rounded-lg"
                />
              )}

              {/* TIME */}
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
