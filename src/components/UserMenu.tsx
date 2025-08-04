import React, { useState } from 'react';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-white hidden sm:block">
          {user.user_metadata?.full_name || user.email?.split('@')[0]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-20">
            <div className="p-3 border-b border-neutral-200">
              <p className="text-sm font-medium text-neutral-900">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
            
            <div className="py-1">
              <button className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                <Shield className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;