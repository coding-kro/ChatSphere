import { useState } from 'react';
import {
  IoLogOut,
  IoSearch,
  IoAttach,
  IoHappyOutline,
  IoChevronBack,
} from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper to toggle views on mobile
  const toggleView = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden selection:bg-cyan-500/30 relative">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar - Hidden on mobile unless isSidebarOpen is true */}
      <aside
        className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-0 z-50 w-full bg-slate-950 
        md:relative md:translate-x-0 md:w-[320px] lg:w-95
        md:bg-white/3 backdrop-blur-2xl border-r border-white/10 
        flex flex-col transition-transform duration-300 ease-in-out
      `}
      >
        {/* Profile Section */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/18878877/pexels-photo-18878877.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-cyan-500/50"
                  alt="profile"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></span>
              </div>
              <div className="hidden sm:block">
                <h4 className="font-bold text-sm lg:text-base">John Doe</h4>
                <p className="text-[10px] text-cyan-400 font-medium tracking-wide">
                  ONLINE
                </p>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 transition-all">
              <IoLogOut size={20} />
            </button>
          </div>

          <div className="relative group">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when selecting a chat
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group"
            >
              <img
                src={`https://i.pravatar.cc/150?u=${item}`}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm lg:text-base truncate">
                    Alex Johnson
                  </h3>
                  <span className="text-[10px] text-slate-500">12:45</span>
                </div>
                <p className="text-xs lg:text-sm text-slate-400 truncate">
                  Check the new designs!
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main
        className={`
        flex-1 flex flex-col z-10 
        ${!isSidebarOpen ? 'flex' : 'hidden md:flex'}
      `}
      >
        {/* Chat Header */}
        <header className="px-4 lg:px-8 py-3 lg:py-5 flex items-center justify-between border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Back Button for Mobile */}
            <button
              onClick={toggleView}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            >
              <IoChevronBack size={24} />
            </button>

            <img
              src="https://i.pravatar.cc/150?u=1"
              className="w-10 h-10 rounded-full border border-cyan-500/30"
              alt=""
            />
            <div>
              <h4 className="font-bold text-sm lg:text-lg">Alex Johnson</h4>
              <p className="text-[10px] lg:text-xs text-green-400 animate-pulse">
                Typing...
              </p>
            </div>
          </div>

          <button className="p-2 lg:p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-red-400">
            <RxCross2 size={20} />
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          {/* Example Receiver */}
          <div className="flex items-end gap-2 lg:gap-3 max-w-[85%] md:max-w-[70%]">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 lg:px-5 lg:py-3 rounded-2xl rounded-bl-none">
              <p className="text-sm lg:text-[15px]">
                Is the dashboard responsive yet? 📱
              </p>
            </div>
          </div>

          {/* Example Sender */}
          <div className="flex justify-end">
            <div className="bg-cyan-600 px-4 py-2 lg:px-5 lg:py-3 rounded-2xl rounded-br-none shadow-lg shadow-cyan-900/20 max-w-[85%] md:max-w-[70%]">
              <p className="text-sm lg:text-[15px] font-medium text-white">
                Yes! Check it out on your phone. It switches smoothly between
                the list and the chat! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-4xl mx-auto flex items-center gap-2 lg:gap-3 bg-white/5 p-1.5 lg:p-2 rounded-2xl border border-white/10 focus-within:border-cyan-500/50 transition-all">
            <button className="hidden sm:block p-2 text-slate-400 hover:text-cyan-400">
              <IoAttach size={22} />
            </button>
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent border-none py-2 px-2 outline-none text-sm lg:text-[15px]"
            />
            <button className="p-2 text-slate-400">
              <IoHappyOutline size={22} />
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-400 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-xs lg:text-sm transition-all active:scale-95">
              SEND
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
