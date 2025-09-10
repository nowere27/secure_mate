import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, IndianRupee, User } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Bodyguard } from '../../types/booking';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import "react-datepicker/dist/react-datepicker.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyguard: Bodyguard | null;
  onBookingSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bodyguard,
  onBookingSuccess,
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleBooking = async () => {
    if (!bodyguard || !selectedDate || !user) return;

    setLoading(true);
    setError('');

    try {
      const totalAmount = bodyguard.hourly_rate * duration;

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          client_id: user.id,
          bodyguard_id: bodyguard.id,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: selectedTime,
          duration_hours: duration,
          total_amount: totalAmount,
          special_requirements: specialRequirements || null,
        });

      if (bookingError) {
        setError(bookingError.message);
        return;
      }

      onBookingSuccess();
      onClose();
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!bodyguard) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xl shadow-primary/20"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-primary to-primary-dark">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    {bodyguard.profile_photo ? (
                      <img
                        src={bodyguard.profile_photo}
                        alt={bodyguard.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white">{bodyguard.full_name}</h3>
                  <div className="flex items-center text-white/80">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {bodyguard.hourly_rate}/hour
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm animate-pulse">
                  {error}
                </div>
              )}

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    minDate={new Date()}
                    className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Duration (hours)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                >
                  {[1, 2, 3, 4, 6, 8, 12, 24].map((hours) => (
                    <option key={hours} value={hours}>
                      {hours} hour{hours > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all duration-300"
                  placeholder="Any specific requirements or instructions..."
                />
              </div>

              {/* Total Amount */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-neutral-600 mb-2">
                  <span>Rate per hour:</span>
                  <span className="font-medium">₹{bodyguard.hourly_rate}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600 mb-2">
                  <span>Duration:</span>
                  <span className="font-medium">{duration} hour{duration > 1 ? 's' : ''}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="flex justify-between items-center text-primary font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">₹{bodyguard.hourly_rate * duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(251, 191, 36, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  disabled={loading || !selectedDate}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-primary rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent/40"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;