import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Reward, RewardCategory, User } from '../types';
import RewardCard from './RewardCard';
import RewardModal from './RewardModal';

interface RewardsListProps {
  rewards: Reward[];
  user: User;
}

const RewardsList: React.FC<RewardsListProps> = ({ rewards, user }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Rewards' },
    { id: RewardCategory.TRAVEL, name: 'Travel' },
    { id: RewardCategory.DINING, name: 'Dining' },
    { id: RewardCategory.SHOPPING, name: 'Shopping' },
    { id: RewardCategory.ENTERTAINMENT, name: 'Entertainment' },
    { id: RewardCategory.CASHBACK, name: 'Cashback' },
  ];

  const filteredRewards = activeCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === activeCategory);

  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };

  const closeModal = () => {
    setSelectedReward(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Rewards</h2>
          <p className="text-gray-600">
            Welcome back, {user.name}! You have{' '}
            <span className="font-semibold text-[#1a1f71]">
              {user.availablePoints.toLocaleString()}
            </span>{' '}
            points available.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="md:hidden">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Rewards
            </button>
            
            {showFilters && (
              <div className="mt-3 flex overflow-x-auto space-x-2 pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-[#1a1f71] text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden md:flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#1a1f71] text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredRewards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRewards.map(reward => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onClick={handleRewardClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No rewards found in this category.</p>
        </div>
      )}
      
      {selectedReward && (
        <RewardModal 
          reward={selectedReward} 
          userPoints={user.availablePoints}
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default RewardsList;