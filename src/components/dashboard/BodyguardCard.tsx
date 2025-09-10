import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, IndianRupee } from 'lucide-react';
import { Bodyguard } from '../../types/booking';

interface BodyguardCardProps {
  bodyguard: Bodyguard;
  onBook: (bodyguard: Bodyguard) => void;
}

const BodyguardCard: React.FC<BodyguardCardProps> = ({ bodyguard, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
      }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
    >
      {/* Profile Image */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
            {bodyguard.image_url ? (
              <img
                src={bodyguard.image_url}
                alt={bodyguard.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {bodyguard.full_name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute -top-1 -right-1">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
        </div>
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{bodyguard.full_name}</h3>
        
        <div className="flex items-center justify-center text-slate-400 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {bodyguard.location}
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center text-slate-300">
            <Clock className="w-4 h-4 mr-1 text-blue-400" />
            {bodyguard.experience} years
          </div>
          
          <div className="flex items-center text-slate-300">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            4.8
          </div>
        </div>
      </div>

      {/* Rate */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center text-2xl font-bold text-white">
          <IndianRupee className="w-6 h-6 text-blue-400" />
          {bodyguard.hourly_rate}
          <span className="text-sm text-slate-400 ml-1">/hour</span>
        </div>
      </div>

      {/* Book Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onBook(bodyguard)}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default BodyguardCard;