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
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
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
        boxShadow: '0 10px 25px rgba(27, 46, 89, 0.15)'
      }}
      className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-lg"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              {booking.bodyguard?.profile_photo ? (
                <img
                  src={booking.bodyguard.profile_photo}
                  alt={booking.bodyguard.full_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary">
              {booking.bodyguard?.full_name || 'Bodyguard'}
            </h3>
            <div className="flex items-center text-neutral-600 text-sm">
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
        <div className="flex items-center text-neutral-600">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm">
            {format(new Date(booking.booking_date), 'MMM dd, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center text-neutral-600">
          <Clock className="w-4 h-4 mr-2 text-accent" />
          <span className="text-sm">
            {formatTime(booking.booking_time)}
          </span>
        </div>
      </div>

      {/* Duration and Amount */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 relative z-10">
        <div className="text-neutral-600">
          <span className="text-sm">Duration: </span>
          <span className="font-medium">{booking.duration_hours}h</span>
        </div>
        
        <div className="flex items-center text-primary font-semibold">
          <IndianRupee className="w-4 h-4 mr-1 text-success" />
          {booking.total_amount}
        </div>
      </div>

      {/* Special Requirements */}
      {booking.special_requirements && (
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg relative z-10">
          <p className="text-xs text-neutral-500 mb-1">Special Requirements:</p>
          <p className="text-sm text-neutral-700">{booking.special_requirements}</p>
        </div>
      )}
    </motion.div>
  );
};

export default BookingCard;