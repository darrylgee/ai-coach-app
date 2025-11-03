import React from 'react';
import CoachPanel from './components/CoachPanel';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import PaywallScreen from './components/PaywallScreen';

const App: React.FC = () => {
  const { user, loading, isSubscribed } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-300"></div>
      </div>
    );
  }
  
  if (!user) {
    return <LoginScreen />;
  }

  if (!isSubscribed) {
    return <PaywallScreen />;
  }

  return <MainLayout />;
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <Header />
      <main className="w-full max-w-4xl flex-grow">
        <CoachPanel />
      </main>
      <Footer />
    </div>
  );
}

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    return (
        <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
            <div className="inline-flex items-center gap-4">
               <div className="w-12 h-12 bg-yellow-300 rounded-full animate-bounce" style={{ animationDuration: '1.5s' }}></div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">The Crosscourt Reset</h1>
                <p className="text-yellow-300 text-lg">AI Coach</p>
              </div>
            </div>
            {user && (
                 <div className="flex items-center gap-4">
                    <span className="text-gray-300 hidden sm:block">Welcome, {user.displayName || 'Player'}</span>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors duration-200"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="w-full max-w-4xl mt-8 text-center text-gray-500 text-sm">
        <p>Based on the book "The Crosscourt Reset" by Darryl Gee. All rights reserved.</p>
        <p>AI-powered by Gemini</p>
    </footer>
);

export default App;
