export interface Reward {
  id: string;
  title: string;
  description: string;
  category: RewardCategory;
  points: number;
  expiryDate: string;
  isRedeemed: boolean;
  image: string;
}

export enum RewardCategory {
  TRAVEL = 'travel',
  DINING = 'dining',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  CASHBACK = 'cashback',
}

export interface User {
  id: string;
  name: string;
  tier: 'BASIC' | 'GOLD' | 'PLATINUM';
  totalPoints: number;
  availablePoints: number;
  pointsHistory: {
    date: string;
    points: number;
    description: string;
  }[];
}