import { Reward, User } from '../types';
import { mockRewards, mockUsers } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUserRewards = async (userId: string): Promise<{ user: User, rewards: Reward[] }> => {
  // Simulate network request
  await delay(800);
  
  const user = mockUsers.find(user => user.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Filter some rewards based on user tier
  const userRewards = mockRewards.filter(reward => {
    if (user.tier === 'PLATINUM') return true;
    if (user.tier === 'GOLD' && reward.points <= 5000) return true;
    if (user.tier === 'BASIC' && reward.points <= 2000) return true;
    return false;
  });
  
  return { user, rewards: userRewards };
};