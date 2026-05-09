const chats = [
  {
    id: 1,
    name: 'Alex Johnson',
    message: 'Check the new designs!',
    time: '12:45',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    message: 'Meeting at 5 PM',
    time: '11:20',
  },
  {
    id: 3,
    name: 'Michael Lee',
    message: 'Send me the files',
    time: '09:10',
  },
];

const Chatlist = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {chats.map((chat) => (
        <button
          key={chat.id}
          className="
            w-full
            flex items-center gap-3 lg:gap-4
            p-3 lg:p-4
            rounded-2xl
            hover:bg-white/5
            hover:scale-[1.01]
            transition-all
            text-left
            group
          "
        >
          <img
            src={`https://i.pravatar.cc/150?u=${chat.id}`}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
            alt={chat.name}
            loading="lazy"
          />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm lg:text-base truncate">
                {chat.name}
              </h3>

              <span className="text-[10px] text-slate-500">{chat.time}</span>
            </div>

            <p className="text-xs lg:text-sm text-slate-400 truncate">
              {chat.message}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Chatlist;
