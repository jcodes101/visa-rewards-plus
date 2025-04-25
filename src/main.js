import './style.css';
import { mockRewards, mockUsers } from './mockData.js';

// DOM Elements
const userForm = document.getElementById('userForm');
const welcomeSection = document.getElementById('welcomeSection');
const rewardsSection = document.getElementById('rewardsSection');
const rewardsList = document.getElementById('rewardsList');
const userProfile = document.getElementById('userProfile');
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.getElementById('submitButton');
const rewardModal = document.getElementById('rewardModal');
const currentYear = document.getElementById('currentYear');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch user rewards
async function fetchUserRewards(userId) {
  await delay(800);
  
  const user = mockUsers.find(user => user.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Filter rewards based on user tier
  const userRewards = mockRewards.filter(reward => {
    if (user.tier === 'PLATINUM') return true;
    if (user.tier === 'GOLD' && reward.points <= 5000) return true;
    if (user.tier === 'BASIC' && reward.points <= 2000) return true;
    return false;
  });
  
  return { user, rewards: userRewards };
}

// Format date
function formatDate(dateString, options = {}) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: options.long ? 'long' : 'short',
    day: 'numeric',
    ...options
  });
}

// Get category color
function getCategoryColor(category) {
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
}

// Get tier color
function getTierColor(tier) {
  const tierColors = {
    BASIC: 'bg-gray-100 text-gray-800',
    GOLD: 'bg-yellow-100 text-yellow-800',
    PLATINUM: 'bg-purple-100 text-purple-800'
  };
  return tierColors[tier] || tierColors.BASIC;
}

// Render rewards list
function renderRewardsList(rewards, user) {
  const categories = [
    { id: 'all', name: 'All Rewards' },
    { id: 'travel', name: 'Travel' },
    { id: 'dining', name: 'Dining' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'cashback', name: 'Cashback' }
  ];

  const html = `
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Your Rewards</h2>
          <p class="text-gray-600">
            Welcome back, ${user.name}! You have
            <span class="font-semibold text-[#1a1f71]">
              ${user.availablePoints.toLocaleString()}
            </span>
            points available.
          </p>
        </div>
        
        <div class="mt-4 md:mt-0">
          <div class="hidden md:flex space-x-2" id="categoryFilters">
            ${categories.map(category => `
              <button
                data-category="${category.id}"
                class="px-4 py-2 rounded-full text-sm transition-colors ${
                  category.id === 'all'
                    ? 'bg-[#1a1f71] text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }"
              >
                ${category.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="rewardsGrid">
        ${rewards.map(reward => `
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
            data-reward-id="${reward.id}"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="${reward.image}"
                alt="${reward.title}"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 right-3">
                <span class="text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(reward.category)}">
                  ${reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                </span>
              </div>
            </div>
            
            <div class="p-5">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">${reward.title}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">${reward.description}</p>
              
              <div class="flex justify-between items-center">
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  <span>Expires: ${formatDate(reward.expiryDate)}</span>
                </div>
                <div class="flex items-center font-semibold text-[#1a1f71]">
                  <svg class="h-4 w-4 mr-1 text-[#F7B600]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
                  </svg>
                  <span>${reward.points.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  rewardsList.innerHTML = html;

  // Add event listeners for category filters
  const categoryFilters = document.getElementById('categoryFilters');
  categoryFilters.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      const selectedCategory = e.target.dataset.category;
      
      // Update active state
      categoryFilters.querySelectorAll('button').forEach(btn => {
        btn.className = `px-4 py-2 rounded-full text-sm transition-colors ${
          btn.dataset.category === selectedCategory
            ? 'bg-[#1a1f71] text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`;
      });

      // Filter rewards
      const filteredRewards = selectedCategory === 'all'
        ? rewards
        : rewards.filter(reward => reward.category === selectedCategory);

      renderRewardsGrid(filteredRewards);
    }
  });

  // Add event listeners for reward cards
  const rewardsGrid = document.getElementById('rewardsGrid');
  rewardsGrid.addEventListener('click', (e) => {
    const rewardCard = e.target.closest('[data-reward-id]');
    if (rewardCard) {
      const rewardId = rewardCard.dataset.rewardId;
      const reward = rewards.find(r => r.id === rewardId);
      if (reward) {
        showRewardModal(reward, user.availablePoints);
      }
    }
  });
}

// Render rewards grid
function renderRewardsGrid(rewards) {
  const rewardsGrid = document.getElementById('rewardsGrid');
  
  if (rewards.length === 0) {
    rewardsGrid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-600">No rewards found in this category.</p>
      </div>
    `;
    return;
  }

  rewardsGrid.innerHTML = rewards.map(reward => `
    <div
      class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
      data-reward-id="${reward.id}"
    >
      <div class="relative h-40 overflow-hidden">
        <img
          src="${reward.image}"
          alt="${reward.title}"
          class="w-full h-full object-cover"
        />
        <div class="absolute top-3 right-3">
          <span class="text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(reward.category)}">
            ${reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div class="p-5">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${reward.title}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${reward.description}</p>
        
        <div class="flex justify-between items-center">
          <div class="flex items-center text-sm text-gray-500">
            <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            <span>Expires: ${formatDate(reward.expiryDate)}</span>
          </div>
          <div class="flex items-center font-semibold text-[#1a1f71]">
            <svg class="h-4 w-4 mr-1 text-[#F7B600]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
            </svg>
            <span>${reward.points.toLocaleString()} pts</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render user profile
function renderUserProfile(user) {
  const percentUsed = Math.round((user.availablePoints / user.totalPoints) * 100);

  const html = `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">${user.name}</h2>
            <div class="mt-1 flex items-center">
              <span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${getTierColor(user.tier)}">
                ${user.tier} MEMBER
              </span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <div class="text-sm text-gray-500">Member ID</div>
            <div class="font-mono text-sm">${user.id}</div>
          </div>
        </div>

        <div class="mt-6">
          <div class="flex justify-between items-center mb-2">
            <div class="text-sm font-medium text-gray-700">Available Points</div>
            <div class="text-sm text-gray-500">${percentUsed}% of total</div>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-[#F7B600] h-2.5 rounded-full" 
              style="width: ${percentUsed}%"
            ></div>
          </div>
          
          <div class="mt-4 flex justify-between">
            <div class="text-center">
              <div class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 text-[#1a1f71] mx-auto">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <div class="mt-2 font-semibold text-[#1a1f71]">${user.availablePoints.toLocaleString()}</div>
              <div class="text-xs text-gray-500">Available</div>
            </div>
            
            <div class="text-center">
              <div class="flex items-center justify-center h-12 w-12 rounded-full bg-purple-50 text-purple-700 mx-auto">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m2 20 2-2m0 0 2-2m-2 2-2-2m2 2 2 2"/>
                  <path d="M5 13a7 7 0 1 1 14 0"/>
                  <path d="m12 3 3 3-3 3"/>
                </svg>
              </div>
              <div class="mt-2 font-semibold text-gray-900">${user.totalPoints.toLocaleString()}</div>
              <div class="text-xs text-gray-500">Total Earned</div>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Recent Points History</h3>
          <div class="space-y-3">
            ${user.pointsHistory.map(history => `
              <div class="flex justify-between items-center text-sm">
                <div>
                  <div class="font-medium text-gray-800">${history.description}</div>
                  <div class="text-gray-500">${formatDate(history.date)}</div>
                </div>
                <div class="font-semibold text-green-600">+${history.points}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  userProfile.innerHTML = html;
}

// Show reward modal
function showRewardModal(reward, userPoints) {
  const hasEnoughPoints = userPoints >= reward.points;

  const modalHtml = `
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none close-modal"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="sm:flex sm:items-start">
          <div class="w-full">
            <div class="h-48 sm:h-64 overflow-hidden">
              <img
                src="${reward.image}"
                alt="${reward.title}"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-xl leading-6 font-bold text-gray-900 mb-2">
                ${reward.title}
              </h3>
              
              <div class="mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ${reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0f8ff] text-[#1a1f71]">
                  ${reward.points.toLocaleString()} points
                </span>
              </div>
              
              <p class="text-gray-700 mb-4">${reward.description}</p>
              
              <div class="text-sm text-gray-500 mb-6">
                <p>Available until ${formatDate(reward.expiryDate, { long: true })}</p>
              </div>
              
              <div class="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  class="w-full sm:w-auto flex-1 px-4 py-3 rounded-md font-medium text-white ${
                    hasEnoughPoints
                      ? 'bg-[#1a1f71] hover:bg-[#151b5e] transition-colors redeem-button'
                      : 'bg-gray-400 cursor-not-allowed'
                  }"
                  ${!hasEnoughPoints ? 'disabled' : ''}
                >
                  Redeem Reward
                </button>
                <button
                  type="button"
                  class="w-full sm:w-auto flex-1 px-4 py-3 bg-gray-100 rounded-md font-medium text-gray-800 hover:bg-gray-200 transition-colors close-modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  rewardModal.innerHTML = modalHtml;
  rewardModal.classList.remove('hidden');

  // Add event listeners
  rewardModal.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
      rewardModal.classList.add('hidden');
    });
  });

  const redeemButton = rewardModal.querySelector('.redeem-button');
  if (redeemButton) {
    redeemButton.addEventListener('click', () => {
      redeemButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      `;
      redeemButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        const successMessage = `
          <div class="p-4 bg-green-50 text-green-800 rounded-md flex items-center mb-4">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <p>Reward successfully redeemed! Check your email for details.</p>
          </div>
        `;
        redeemButton.parentElement.innerHTML = successMessage;
      }, 1500);
    });
  }

  // Close modal when clicking outside
  rewardModal.addEventListener('click', (e) => {
    if (e.target === rewardModal) {
      rewardModal.classList.add('hidden');
    }
  });
}

// Form submit handler
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value.trim();
  
  if (!userId) {
    errorMessage.textContent = 'Please enter a user ID';
    errorMessage.classList.remove('hidden');
    return;
  }
  
  errorMessage.classList.add('hidden');
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading...
  `;
  
  try {
    const { user, rewards } = await fetchUserRewards(userId);
    welcomeSection.classList.add('hidden');
    rewardsSection.classList.remove('hidden');
    renderRewardsList(rewards, user);
    renderUserProfile(user);
  } catch (err) {
    errorMessage.textContent = 'User not found. Please try another ID.';
    errorMessage.classList.remove('hidden');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'View My Rewards';
  }
});