import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { showToast } from '../utils/showToast';
import { socket } from '../socket';

const Messagearea = ({ selectedUser, currentUserId, setPreviewImage }) => {
  const [messages, setMessages] = useState([]);

  const scrollRef = useRef(null);

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  /**
   * FETCH CHAT HISTORY
   */
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

  /**
   * REALTIME MESSAGE LISTENER
   */
  useEffect(() => {
    if (!selectedUser?._id) return;

    const handleMessage = (newMessage) => {
      const senderId = newMessage.senderId?._id || newMessage.senderId;

      const receiverId = newMessage.receiverId?._id || newMessage.receiverId;

      const isCurrentChat =
        String(senderId) === String(selectedUser._id) ||
        String(receiverId) === String(selectedUser._id);

      if (!isCurrentChat) return;

      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);

        if (exists) return prev;

        return [...prev, newMessage];
      });
    };

    socket.on('receive-message', handleMessage);

    return () => {
      socket.off('receive-message', handleMessage);
    };
  }, [selectedUser]);

  /**
   *  AUTO SCROLL
   */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 space-y-4">
      {messages.map((message) => {
        const senderId = message.senderId?._id || message.senderId;

        const isSender = String(senderId) === String(currentUserId);

        return (
          <div
            key={message._id}
            className={`flex w-full ${
              isSender ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`w-fit max-w-[75%] px-4 py-2 lg:px-5 lg:py-3 rounded-2xl text-sm lg:text-[15px] wrap-break-word whitespace-pre-wrap ${
                isSender
                  ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                  : 'bg-white/10 text-white rounded-bl-none'
              }`}
            >
              {/* TEXT */}
              {message.message && (
                <p className="whitespace-pre-wrap">{message.message}</p>
              )}

              {/* IMAGE */}
              {message.image && (
                <img
                  src={message.image}
                  alt="chat media"
                  className="mt-2 max-w-full max-h-60 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => setPreviewImage(message.image)}
                />
              )}

              {/* TIME */}
              {message.createdAt && (
                <span
                  className={`text-[10px] block mt-1 text-right ${
                    isSender ? 'text-cyan-100' : 'text-gray-300'
                  }`}
                >
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

      <div ref={scrollRef} />
    </div>
  );
};

export default Messagearea;
