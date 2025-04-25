import React from 'react';
import { CreditCard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1a1f71] text-white shadow-lg">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-[#F7B600]" strokeWidth={1.5} />
          <span className="text-2xl font-semibold tracking-tight">Visa Rewards</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="hidden md:block"><a href="#" className="hover:text-[#F7B600] transition-colors">Home</a></li>
            <li className="hidden md:block"><a href="#" className="hover:text-[#F7B600] transition-colors">Benefits</a></li>
            <li className="hidden md:block"><a href="#" className="hover:text-[#F7B600] transition-colors">Help</a></li>
            <li><button className="bg-[#F7B600] text-[#1a1f71] py-2 px-4 rounded-md font-medium hover:bg-[#e5a700] transition-colors">Sign In</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;