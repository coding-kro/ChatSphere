import axios from 'axios';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/showToast';
import { socket } from '../socket';

const Chatlist = ({ setSelectedUser, setIsSidebarOpen }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // 📡 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          withCredentials: true,
        });

        setUsers(response.data.users || []);
      } catch (error) {
        showToast(
          'error',
          error.response?.data?.message || 'Failed to fetch users',
        );
      }
    };

    fetchUsers();
  }, [apiUrl]);

  // 🟢 ONLINE USERS SOCKET
  useEffect(() => {
    socket.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    return () => socket.off('online-users');
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {users.length > 0 ? (
        users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setIsSidebarOpen(false);
              }}
              className="
                w-full flex items-center gap-3 lg:gap-4
                p-3 lg:p-4 rounded-2xl
                hover:bg-white/5 hover:scale-[1.01]
                transition-all text-left group
              "
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={
                    user?.profilePic ||
                    `https://i.pravatar.cc/150?u=${user._id}`
                  }
                  className="w-12 h-12 rounded-xl object-cover"
                  alt={user.fullName}
                />

                {/* Online dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-950 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm lg:text-base truncate">
                    {user.fullName}
                  </h3>
                </div>

                {/* Placeholder for now */}
                <p className="text-xs lg:text-sm text-slate-400 truncate">
                  Start chatting...
                </p>
              </div>
            </button>
          );
        })
      ) : (
        <div className="text-center text-slate-400 mt-10">No chats found</div>
      )}
    </div>
  );
};

export default Chatlist;
