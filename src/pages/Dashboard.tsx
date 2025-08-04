import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Clock, Star, Shield, Calendar, IndianRupee, MessageCircle, Phone } from 'lucide-react';
import Button from '../components/Button';

interface Guard {
  id: string;
  name: string;
  rating: number;
  experience: number;
  hourlyRate: number;
  image: string;
  location: string;
  specialties: string[];
  availability: 'available' | 'busy' | 'offline';
  responseTime: string;
}

const mockGuards: Guard[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 4.9,
    experience: 8,
    hourlyRate: 500,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Ahmedabad',
    specialties: ['VIP Protection', 'Event Security'],
    availability: 'available',
    responseTime: '15 mins'
  },
  {
    id: '2',
    name: 'Vikram Singh',
    rating: 4.8,
    experience: 12,
    hourlyRate: 600,
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Gandhinagar',
    specialties: ['Personal Security', 'Corporate Events'],
    availability: 'available',
    responseTime: '20 mins'
  },
  {
    id: '3',
    name: 'Arjun Patel',
    rating: 4.7,
    experience: 6,
    hourlyRate: 450,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Ahmedabad',
    specialties: ['Residential Security', 'Travel Protection'],
    availability: 'busy',
    responseTime: '30 mins'
  }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState('3');
  const [location, setLocation] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookGuard = (guard: Guard) => {
    setSelectedGuard(guard);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
      guard: selectedGuard,
      date: bookingDate,
      time: bookingTime,
      duration,
      location,
      user: user?.id
    });
    
    // Show success message and close modal
    alert('Booking confirmed! Your guard will contact you shortly.');
    setShowBookingModal(false);
    setSelectedGuard(null);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available Now';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'User'}!
          </h1>
          <p className="text-neutral-600">Find and book your personal security guard</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="time"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Duration</label>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="8">8 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Available Guards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuards.map((guard) => (
            <div key={guard.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={guard.image}
                  alt={guard.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(guard.availability)}`}>
                  {getAvailabilityText(guard.availability)}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-primary">{guard.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{guard.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-neutral-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {guard.location}
                </div>
                
                <div className="flex items-center text-sm text-neutral-600 mb-3">
                  <Shield className="w-4 h-4 mr-1" />
                  {guard.experience} years experience
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {guard.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">{guard.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {guard.responseTime}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => handleBookGuard(guard)}
                    disabled={guard.availability === 'offline'}
                  >
                    Book Now
                  </Button>
                  <button className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <MessageCircle className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <Phone className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedGuard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-primary to-primary-dark text-white">
              <h3 className="text-2xl font-bold mb-2">Confirm Booking</h3>
              <p className="text-white/80">Review your booking details</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={selectedGuard.image}
                  alt={selectedGuard.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">{selectedGuard.name}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{selectedGuard.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Duration</label>
                  <select
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-600">Rate per hour:</span>
                  <span className="font-medium">₹{selectedGuard.hourlyRate}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-600">Duration:</span>
                  <span className="font-medium">{duration} hours</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Total:</span>
                    <span className="font-bold text-primary text-lg">₹{selectedGuard.hourlyRate * parseInt(duration)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleConfirmBooking}
                  disabled={!location || !bookingDate || !bookingTime}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;