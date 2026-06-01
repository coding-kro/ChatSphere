import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './layout/Layout';
import UserProfile from './pages/UserProfile';
import SeeProfile from './pages/SeeProfile';
import NotFound from './pages/NotFound';

import { ToastContainer } from 'react-toastify';

import { socket } from './socket';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // wait until auth loading finishes
    if (loading) return;

    // no user logged in
    if (!user?._id) return;

    /**
     * CONNECT SOCKET
     */
    socket.connect();

    /**
     * ON CONNECT
     */
    const handleConnect = () => {
      console.log('Socket Connected:', socket.id);

      socket.emit('join', user._id);

      console.log('JOIN SENT:', user._id);
    };

    socket.on('connect', handleConnect);

    /**
     * already connected
     */
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [user, loading]);

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route index element={<Layout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/seeprofile/:anotherUserId" element={<SeeProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
