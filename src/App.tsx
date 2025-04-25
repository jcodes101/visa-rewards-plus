import React, { useState } from 'react';
import Header from './components/Header';
import UserForm from './components/UserForm';
import RewardsList from './components/RewardsList';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import { fetchUserRewards } from './services/api';
import { Reward, User } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, rewards } = await fetchUserRewards(userId);
      setUser(user);
      setRewards(rewards);
    } catch (err) {
      setError('User not found. Please try another ID.');
      setUser(null);
      setRewards([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {!user && (
            <div className="mb-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#1a1f71] mb-4">Welcome to Visa Rewards</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Enter your User ID to access exclusive rewards and benefits tailored just for you.
                </p>
              </div>
              
              <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-800 rounded-md max-w-lg mx-auto">
                  {error}
                </div>
              )}
            </div>
          )}
          
          {user && rewards.length > 0 && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <RewardsList rewards={rewards} user={user} />
                </div>
                <div>
                  <UserProfile user={user} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;