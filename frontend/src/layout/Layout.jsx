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

  // NEW STATE
  const [selectedUser, setSelectedUser] = useState(null);

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
          md:relative md:translate-x-0 md:w-[320px] lg:w-[380px]
          md:bg-white/[0.03]
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

        {/* Chat List / User List */}
        {activeTab === 'chats' && (
          <Chatlist
            setSelectedUser={setSelectedUser}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

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

            <Messagearea user={selectedUser} />

            <Inputmsg user={selectedUser} />
          </>
        ) : (
          <Blankmsg />
        )}
      </section>
    </main>
  );
};

export default Layout;
