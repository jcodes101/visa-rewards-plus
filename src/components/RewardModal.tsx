import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { Reward } from '../types';

interface RewardModalProps {
  reward: Reward;
  userPoints: number;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ reward, userPoints, onClose }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [error, setError] = useState('');

  const hasEnoughPoints = userPoints >= reward.points;

  const handleRedeemClick = () => {
    if (!hasEnoughPoints) {
      setError("You don't have enough points to redeem this reward.");
      return;
    }
    
    setError('');
    setIsRedeeming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      setIsRedeemed(true);
    }, 1500);
  };

  // Format expiry date
  const formattedDate = new Date(reward.expiryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <div className="h-48 sm:h-64 overflow-hidden">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-2" id="modal-title">
                  {reward.title}
                </h3>
                
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0f8ff] text-[#1a1f71]">
                    {reward.points.toLocaleString()} points
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{reward.description}</p>
                
                <div className="text-sm text-gray-500 mb-6">
                  <p>Available until {formattedDate}</p>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}
                
                {isRedeemed ? (
                  <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center mb-4">
                    <Check className="h-5 w-5 mr-2" />
                    <p>Reward successfully redeemed! Check your email for details.</p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      className={`w-full sm:w-auto flex-1 px-4 py-3 rounded-md font-medium text-white ${
                        hasEnoughPoints
                          ? 'bg-[#1a1f71] hover:bg-[#151b5e] transition-colors'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handleRedeemClick}
                      disabled={isRedeeming || !hasEnoughPoints}
                    >
                      {isRedeeming ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Redeem Reward'
                      )}
                    </button>
                    <button
                      type="button"
                      className="w-full sm:w-auto flex-1 px-4 py-3 bg-gray-100 rounded-md font-medium text-gray-800 hover:bg-gray-200 transition-colors"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;