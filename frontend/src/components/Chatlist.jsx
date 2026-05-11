const chats = [
  {
    id: 1,
    name: 'Alex Johnson',
    message: 'Check the new designs!',
    time: '12:45',
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Smith',
    message: 'Meeting at 5 PM',
    time: '11:20',
    online: false,
  },
  {
    id: 3,
    name: 'Michael Lee',
    message: 'Send me the files',
    time: '09:10',
    online: true,
  },
  {
    id: 4,
    name: 'Emma Watson',
    message: 'Let’s catch up tomorrow',
    time: '08:30',
    online: false,
  },
  {
    id: 5,
    name: 'John Carter',
    message: 'Project is almost done',
    time: '07:15',
    online: true,
  },
  {
    id: 6,
    name: 'Sophia Brown',
    message: 'Can you review this?',
    time: '06:50',
    online: false,
  },
  {
    id: 7,
    name: 'Daniel Wilson',
    message: 'Got your message 👍',
    time: 'Yesterday',
    online: true,
  },
  {
    id: 8,
    name: 'Olivia Davis',
    message: 'Call me when free',
    time: 'Yesterday',
    online: false,
  },
  {
    id: 9,
    name: 'James Miller',
    message: 'New update deployed 🚀',
    time: 'Yesterday',
    online: true,
  },
  {
    id: 10,
    name: 'Ava Taylor',
    message: 'Thanks for your help!',
    time: 'Mon',
    online: false,
  },
];

const Chatlist = ({ setSelectedUser, setIsSidebarOpen }) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => {
            setSelectedUser(chat);
            setIsSidebarOpen(false);
          }}
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
          <div className="relative shrink-0">
            <img
              src={`https://i.pravatar.cc/150?u=${chat.id}`}
              className="w-12 h-12 rounded-xl object-cover"
              alt={chat.name}
              loading="lazy"
            />

            <span
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-950 rounded-full ${
                chat.online ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
          </div>

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
