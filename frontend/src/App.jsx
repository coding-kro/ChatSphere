import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import UserProfile from './pages/UserProfile';
import UpdateUserProfile from './pages/UpdateUserProfile';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/test" element={<UpdateUserProfile />} />
        <Route index element={<Layout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/updateprofile" element={<UpdateUserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
