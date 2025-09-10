import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/dashboard/Sidebar';
import BodyguardCard from '../components/dashboard/BodyguardCard';
import BookingModal from '../components/dashboard/BookingModal';
import BookingCard from '../components/dashboard/BookingCard';
import { Bodyguard, Booking, Profile } from '../types/booking';
import { Search, Filter, Calendar, User, Mail, Phone, Edit2, Save, X } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [bodyguards, setBodyguards] = useState<Bodyguard[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyguard, setSelectedBodyguard] = useState<Bodyguard | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchBodyguards(),
      fetchBookings(),
      fetchProfile(),
    ]);
    setLoading(false);
  };

  const fetchBodyguards = async () => {
    try {
      const { data, error } = await supabase
        .from('bodyguards')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBodyguards(data || []);
    } catch (error) {
      console.error('Error fetching bodyguards:', error);
    }
  };

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          bodyguard:bodyguards(*)
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setProfileForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
        });
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          phone: '',
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        setProfile(createdProfile);
        setProfileForm({
          full_name: createdProfile.full_name || '',
          phone: createdProfile.phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleBooking = (bodyguard: Bodyguard) => {
    setSelectedBodyguard(bodyguard);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    fetchBookings();
  };

  const handleProfileUpdate = async () => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileForm.full_name,
          phone: profileForm.phone,
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile({
        ...profile,
        full_name: profileForm.full_name,
        phone: profileForm.phone,
      });
      setEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const filteredBodyguards = bodyguards.filter(bodyguard =>
    bodyguard.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bodyguard.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingBookings = bookings.filter(booking => 
    ['pending', 'confirmed'].includes(booking.status)
  );

  const pastBookings = bookings.filter(booking => 
    ['completed', 'cancelled'].includes(booking.status)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {activeTab === 'home' && 'Find Bodyguards'}
                {activeTab === 'bookings' && 'My Bookings'}
                {activeTab === 'profile' && 'Profile Settings'}
              </h1>
              <p className="text-slate-400 mt-1">
                {activeTab === 'home' && 'Browse and book professional security guards'}
                {activeTab === 'bookings' && 'Manage your current and past bookings'}
                {activeTab === 'profile' && 'Update your personal information'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Home Tab - Bodyguards List */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button className="flex items-center space-x-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Bodyguards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBodyguards.map((bodyguard) => (
                    <BodyguardCard
                      key={bodyguard.id}
                      bodyguard={bodyguard}
                      onBook={handleBooking}
                    />
                  ))}
                </div>

                {filteredBodyguards.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400">No bodyguards found matching your search.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Upcoming Bookings */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    Upcoming Bookings ({upcomingBookings.length})
                  </h2>
                  
                  {upcomingBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
                      <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">No upcoming bookings</p>
                    </div>
                  )}
                </div>

                {/* Past Bookings */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Past Bookings ({pastBookings.length})
                  </h2>
                  
                  {pastBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
                      <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">No past bookings</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl"
              >
                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {profile?.full_name || user?.user_metadata?.full_name || 'User'}
                        </h2>
                        <p className="text-white/80">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                      {!editingProfile ? (
                        <button
                          onClick={() => setEditingProfile(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProfile(false)}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={handleProfileUpdate}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={profileForm.full_name}
                            onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-slate-700 rounded-lg text-white">
                            {profile?.full_name || 'Not set'}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        {editingProfile ? (
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-slate-700 rounded-lg text-white">
                            {profile?.phone || 'Not set'}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        <div className="p-3 bg-slate-700 rounded-lg text-slate-400">
                          {user?.email} (Cannot be changed)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bodyguard={selectedBodyguard}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default ClientDashboard;