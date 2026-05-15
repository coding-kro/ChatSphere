import { useState } from 'react';

import Chatlist from '../components/Chatlist';
import Userlist from '../components/Userlist';
import Searchbar from '../components/Searchbar';
import Profile from '../components/Profile';
import Chatheader from '../components/Chatheader';
import Messagearea from '../components/Messagearea';
import Inputmsg from '../components/Inputmsg';
import Selectbutton from '../components/Selectbutton';
import Blankmsg from '../components/Blankmsg';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chats');

  // Selected chat user
  const [selectedUser, setSelectedUser] = useState(null);

  // Logged in user ID
  // Replace this with your auth/context user
  const currentUserId = '69fbf16fb095acb365a6e05c';

  const toggleView = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="h-screen bg-slate-950 text-white flex overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-full
          bg-slate-950
          md:relative md:translate-x-0 md:w-[320px] lg:w-95
          md:bg-white/3
          backdrop-blur-2xl
          border-r border-white/10
          flex flex-col
          transition-transform duration-300 ease-in-out
        `}
      >
        <Profile />

        <Searchbar />

        {/* Tabs */}
        <Selectbutton activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Chat List */}
        {activeTab === 'chats' && (
          <Chatlist
            setSelectedUser={setSelectedUser}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

        {/* User List */}
        {activeTab === 'contacts' && (
          <Userlist
            setSelectedUser={setSelectedUser}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
      </aside>

      {/* Chat Area */}
      <section
        className={`
          flex-1 flex flex-col z-10
          ${isSidebarOpen && !selectedUser ? 'hidden md:flex' : 'flex'}
        `}
      >
        {selectedUser ? (
          <>
            <Chatheader
              toggleView={toggleView}
              user={selectedUser}
              setSelectedUser={setSelectedUser}
            />

            {/* FIXED */}
            <Messagearea
              selectedUser={selectedUser}
              currentUserId={currentUserId}
            />

            {/* FIXED */}
            <Inputmsg selectedUser={selectedUser} />
          </>
        ) : (
          <Blankmsg />
        )}
      </section>
    </main>
  );
};

export default Layout;
