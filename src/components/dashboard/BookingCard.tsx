import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, IndianRupee, User } from 'lucide-react';
import { format } from 'date-fns';
import { Booking } from '../../types/booking';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)'
      }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
              {booking.bodyguard?.profile_photo ? (
                <img
                  src={booking.bodyguard.profile_photo}
                  alt={booking.bodyguard.full_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white">
              {booking.bodyguard?.full_name || 'Bodyguard'}
            </h3>
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {booking.bodyguard?.location || 'Location'}
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm">
            {format(new Date(booking.booking_date), 'MMM dd, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Clock className="w-4 h-4 mr-2 text-purple-400" />
          <span className="text-sm">
            {formatTime(booking.booking_time)}
          </span>
        </div>
      </div>

      {/* Duration and Amount */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700 relative z-10">
        <div className="text-gray-300">
          <span className="text-sm">Duration: </span>
          <span className="font-medium">{booking.duration_hours}h</span>
        </div>
        
        <div className="flex items-center text-white font-semibold">
          <IndianRupee className="w-4 h-4 mr-1 text-green-400" />
          {booking.total_amount}
        </div>
      </div>

      {/* Special Requirements */}
      {booking.special_requirements && (
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg relative z-10">
          <p className="text-xs text-gray-400 mb-1">Special Requirements:</p>
          <p className="text-sm text-gray-300">{booking.special_requirements}</p>
        </div>
      )}
    </motion.div>
  );
};

export default BookingCard;