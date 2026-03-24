import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import VideosPage from './pages/VideosPage';
import PricingPage from './pages/PricingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import OwnerPanel from './pages/OwnerPanel';

function AppRouter() {
  const { currentPage } = useApp();

  const pages: Record<string, React.ReactElement> = {
    home: <HomePage />,
    chat: <ChatPage />,
    videos: <VideosPage />,
    pricing: <PricingPage />,
    leaderboard: <LeaderboardPage />,
    login: <LoginPage />,
    profile: <ProfilePage />,
    admin: <AdminPanel />,
    owner: <OwnerPanel />,
  };

  return (
    <div className="font-inter bg-slate-900 min-h-screen">
      <Navbar />
      <div key={currentPage} className="animate-fadeIn">
        {pages[currentPage] || <HomePage />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
