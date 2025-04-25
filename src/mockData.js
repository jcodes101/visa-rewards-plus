export const mockRewards = [
  {
    id: '1',
    title: 'Weekend Getaway',
    description: 'Enjoy a weekend stay at a luxury hotel with complimentary breakfast',
    category: 'travel',
    points: 5000,
    expiryDate: '2025-12-31',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '2',
    title: 'Fine Dining Experience',
    description: 'A three-course meal for two at a Michelin-star restaurant',
    category: 'dining',
    points: 3000,
    expiryDate: '2025-10-15',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '3',
    title: 'Movie Night',
    description: 'Two premium movie tickets with popcorn and drinks',
    category: 'entertainment',
    points: 1200,
    expiryDate: '2025-09-30',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '4',
    title: '$50 Shopping Voucher',
    description: 'Redeem at any partner retail store or online',
    category: 'shopping',
    points: 2000,
    expiryDate: '2025-11-20',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '5',
    title: '$25 Cashback',
    description: 'Receive $25 cashback on your next statement',
    category: 'cashback',
    points: 1000,
    expiryDate: '2025-08-15',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '6',
    title: 'Spa Day',
    description: 'Full day spa package with massage and treatments',
    category: 'entertainment',
    points: 4000,
    expiryDate: '2025-07-30',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '7',
    title: 'Adventure Park Tickets',
    description: 'Two full-day tickets to a premium adventure park',
    category: 'entertainment',
    points: 3500,
    expiryDate: '2025-08-31',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/784916/pexels-photo-784916.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '8',
    title: 'Round-trip Flight Discount',
    description: 'Get $200 off your next round-trip flight',
    category: 'travel',
    points: 6000,
    expiryDate: '2025-10-31',
    isRedeemed: false,
    image: 'https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&w=500'
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'John Smith',
    tier: 'PLATINUM',
    totalPoints: 25000,
    availablePoints: 18500,
    pointsHistory: [
      { date: '2025-05-15', points: 500, description: 'Monthly bonus' },
      { date: '2025-05-10', points: 1200, description: 'International purchase' },
      { date: '2025-05-01', points: 750, description: 'Dining reward' }
    ]
  },
  {
    id: 'user2',
    name: 'Emily Johnson',
    tier: 'GOLD',
    totalPoints: 12000,
    availablePoints: 8500,
    pointsHistory: [
      { date: '2025-05-12', points: 300, description: 'Monthly bonus' },
      { date: '2025-05-08', points: 600, description: 'Travel purchase' },
      { date: '2025-05-03', points: 450, description: 'Grocery shopping' }
    ]
  },
  {
    id: 'user3',
    name: 'Michael Brown',
    tier: 'BASIC',
    totalPoints: 5000,
    availablePoints: 3200,
    pointsHistory: [
      { date: '2025-05-14', points: 200, description: 'Monthly bonus' },
      { date: '2025-05-07', points: 350, description: 'Online shopping' },
      { date: '2025-05-02', points: 250, description: 'Gas station purchase' }
    ]
  }
];