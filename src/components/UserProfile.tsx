import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const tierColors = {
    BASIC: 'bg-gray-100 text-gray-800',
    GOLD: 'bg-yellow-100 text-yellow-800',
    PLATINUM: 'bg-purple-100 text-purple-800',
  };

  const getTierColor = () => {
    return tierColors[user.tier] || tierColors.BASIC;
  };

  // Calculate percentage of points used
  const percentUsed = Math.round((user.availablePoints / user.totalPoints) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <div className="mt-1 flex items-center">
              <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${getTierColor()}`}>
                {user.tier} MEMBER
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-500">Member ID</div>
            <div className="font-mono text-sm">{user.id}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-700">Available Points</div>
            <div className="text-sm text-gray-500">{percentUsed}% of total</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#F7B600] h-2.5 rounded-full" 
              style={{ width: `${percentUsed}%` }}
            ></div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 text-[#1a1f71] mx-auto">
                <Award className="h-6 w-6" />
              </div>
              <div className="mt-2 font-semibold text-[#1a1f71]">{user.availablePoints.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Available</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-50 text-purple-700 mx-auto">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="mt-2 font-semibold text-gray-900">{user.totalPoints.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total Earned</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Points History</h3>
          <div className="space-y-3">
            {user.pointsHistory.map((history, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-medium text-gray-800">{history.description}</div>
                  <div className="text-gray-500">
                    {new Date(history.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className="font-semibold text-green-600">+{history.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;