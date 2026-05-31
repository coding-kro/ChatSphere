import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '../socket'; // 👈 import your socket instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users/me`, {
          withCredentials: true,
        });

        const userData = res.data?.user || null;

        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [apiUrl]);

  /**
   * ✅ SOCKET JOIN (IMPORTANT PART)
   */
  useEffect(() => {
    if (user?._id) {
      socket.connect(); // ensure connection
      socket.emit('join', user._id);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
