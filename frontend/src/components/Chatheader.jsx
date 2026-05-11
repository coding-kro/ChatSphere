import { IoChevronBack } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const Chatheader = ({ toggleView, user, setSelectedUser }) => {
  return (
    <header className="px-4 lg:px-8 py-3 lg:py-5 flex items-center justify-between border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Back Button for Mobile */}
        <button
          onClick={toggleView}
          className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Open sidebar"
        >
          <IoChevronBack size={24} />
        </button>

        {/* User Image */}
        <img
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          className="w-10 h-10 rounded-full border border-cyan-500/30"
          alt={user.name}
        />

        {/* User Info */}
        <div>
          <h4 className="font-bold text-sm lg:text-lg">{user.name}</h4>

          <p
            className={`text-[10px] lg:text-xs ${
              user.online ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {user.online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="hidden lg:flex p-2 lg:p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-red-400 transition-colors"
        aria-label="Close chat"
      >
        <RxCross2 size={20} />
      </button>
    </header>
  );
};

export default Chatheader;
