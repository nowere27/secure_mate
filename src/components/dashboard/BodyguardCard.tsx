import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, IndianRupee, User } from 'lucide-react';
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
        boxShadow: '0 20px 40px rgba(27, 46, 89, 0.15)'
      }}
      className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-lg"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Profile Image */}
      <div className="relative mb-6 z-10">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            {bodyguard.profile_photo ? (
              <img
                src={bodyguard.profile_photo}
                alt={bodyguard.full_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute -top-1 -right-1">
          <div className="w-4 h-4 bg-success rounded-full border-2 border-white animate-pulse shadow-lg shadow-success/50"></div>
        </div>
      </div>

      {/* Info */}
      <div className="text-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-primary mb-1">{bodyguard.full_name}</h3>
        
        <div className="flex items-center justify-center text-neutral-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {bodyguard.location}
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center text-neutral-600">
            <Clock className="w-4 h-4 mr-1 text-primary" />
            {bodyguard.experience} years
          </div>
          
          <div className="flex items-center text-neutral-600">
            <Star className="w-4 h-4 mr-1 text-accent fill-current" />
            4.8
          </div>
        </div>
      </div>

      {/* Rate */}
      <div className="text-center mb-6 relative z-10">
        <div className="flex items-center justify-center text-2xl font-bold text-primary">
          <IndianRupee className="w-6 h-6 text-accent" />
          {bodyguard.hourly_rate}
          <span className="text-sm text-neutral-600 ml-1">/hour</span>
        </div>
      </div>

      {/* Book Button */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(251, 191, 36, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onBook(bodyguard)}
        className="relative z-10 w-full py-3 px-6 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-primary font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/40"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default BodyguardCard;