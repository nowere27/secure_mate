import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { signOut, user } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-primary via-primary-dark to-primary border-r border-primary-light/20 z-40 shadow-2xl shadow-primary/20"
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary-light/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shadow-lg shadow-accent/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-poppins">SecureMate</h2>
            <p className="text-sm text-white/70">Client Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-primary-light/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {user?.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-white/70">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-accent-dark text-primary shadow-lg shadow-accent/30'
                      : 'text-white/70 hover:bg-primary-light hover:text-white hover:shadow-lg hover:shadow-primary/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-white/70 group-hover:text-accent'} transition-colors duration-200`} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-primary-light/20">
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)'
          }}
          whileTap={{ scale: 0.98 }}
          onClick={signOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-full bg-gradient-to-r from-error to-error text-white hover:from-error hover:to-error transition-all duration-300 shadow-lg hover:shadow-error/40"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;