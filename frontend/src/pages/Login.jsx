import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import axios from 'axios';
import { showToast } from '../utils/showToast.js';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      showToast('error', 'Please enter a valid email address');
      return;
    }

    if (trimmedPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        {
          email: trimmedEmail,
          password: trimmedPassword,
        },
        {
          withCredentials: true,
        },
      );

      setUser(res.data);
      showToast('success', 'Login successful!');

      setEmail('');
      setPassword('');
      setShowPassword(false);

      navigate('/');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      showToast('error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide bg-linear-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            ChatSphere
          </h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back 👋</p>
        </div>

        <form
          onSubmit={handleLogin}
          className={`space-y-4 ${loading ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                disabled={loading}
                className="w-full px-4 py-2 pr-12 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
              >
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-linear-to-r from-cyan-500 to-purple-600 hover:opacity-90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-cyan-400 hover:text-purple-400 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
