import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="h-screen bg-slate-950 text-white flex items-center justify-center overflow-hidden relative px-6">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="text-center z-10 max-w-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <AlertTriangle className="w-12 h-12 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-8xl font-black tracking-tight bg-linear-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold mt-4">Page Not Found</h2>

        <p className="text-slate-400 mt-3 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex mt-8 items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white font-medium hover:scale-105 transition-transform duration-300"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
