import { useState } from 'react';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/showToast.js';

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    setPasswordError('');
    setConfirmPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      showToast('error', 'Please enter a valid email address');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      setPasswordError(
        'Password must be at least 6 characters and include letters and numbers',
      );
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${apiUrl}/api/auth/register`, {
        fullName: trimmedFullName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      showToast('success', 'Signup successful!');

      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setShowPassword(false);
      setShowConfirmPassword(false);

      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Signup failed. Try again.';
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
          <p className="text-slate-400 text-sm mt-1">
            Create your account to continue
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className={`space-y-4 ${
            loading ? 'opacity-70 pointer-events-none' : ''
          }`}
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError('');
                }}
                disabled={loading}
                className="w-full px-4 py-2 pr-12 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400"
              >
                {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>

            {confirmPasswordError && (
              <p className="text-red-400 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-linear-to-r from-cyan-500 to-purple-600 hover:opacity-90'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 hover:text-purple-400 font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
