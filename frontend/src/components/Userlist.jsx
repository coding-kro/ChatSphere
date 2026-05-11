const users = [
  {
    id: 1,
    name: 'Alex Johnson',
    time: '12:45',
    online: true,
  },
  {
    id: 2,
    name: 'Emma Watson',
    time: '11:30',
    online: false,
  },
  {
    id: 3,
    name: 'Michael Lee',
    time: '10:15',
    online: true,
  },
  {
    id: 4,
    name: 'Sophia Brown',
    time: '09:40',
    online: false,
  },
  {
    id: 5,
    name: 'Daniel Smith',
    time: '08:55',
    online: true,
  },
  {
    id: 6,
    name: 'Olivia Davis',
    time: 'Yesterday',
    online: false,
  },
  {
    id: 7,
    name: 'James Wilson',
    time: 'Yesterday',
    online: true,
  },
  {
    id: 8,
    name: 'Isabella Taylor',
    time: '07:20',
    online: true,
  },
];

const Userlist = ({ setSelectedUser, setIsSidebarOpen }) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 lg:px-4 space-y-1 custom-scrollbar">
      {users.map((chat) => (
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
          {/* Avatar with online status */}
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

          {/* Chat Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm lg:text-base truncate">
                {chat.name}
              </h3>

              <span className="text-[10px] text-slate-500">{chat.time}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Userlist;
