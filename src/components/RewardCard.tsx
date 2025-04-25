import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  onClick: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onClick }) => {
  // Format expiry date
  const formattedDate = new Date(reward.expiryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'travel':
        return 'bg-blue-100 text-blue-800';
      case 'dining':
        return 'bg-red-100 text-red-800';
      case 'shopping':
        return 'bg-purple-100 text-purple-800';
      case 'entertainment':
        return 'bg-green-100 text-green-800';
      case 'cashback':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(reward)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={reward.image}
          alt={reward.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(reward.category)}`}>
            {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{reward.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Expires: {formattedDate}</span>
          </div>
          <div className="flex items-center font-semibold text-[#1a1f71]">
            <Gift className="h-4 w-4 mr-1 text-[#F7B600]" />
            <span>{reward.points.toLocaleString()} pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;