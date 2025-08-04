import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Shield, Star, IndianRupee, Calendar, MapPin, User, Settings } from 'lucide-react';
import Button from '../components/Button';

interface BodyguardProfile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  profile_photo: string | null;
  experience: number;
  hourly_rate: number;
  location: string;
  status: string;
  created_at: string;
}

const BodyguardDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BodyguardProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bodyguards')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 pt-20">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Profile Not Found</h2>
          <p className="text-neutral-600">Unable to load your bodyguard profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="text-neutral-600">Manage your bodyguard profile and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100/50 overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    {profile.profile_photo ? (
                      <img
                        src={profile.profile_photo}
                        alt={profile.full_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.full_name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile.status === 'approved' 
                          ? 'bg-green-500/20 text-green-100' 
                          : 'bg-yellow-500/20 text-yellow-100'
                      }`}>
                        {profile.status === 'approved' ? 'Active' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Experience</span>
                  <span className="font-semibold">{profile.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Hourly Rate</span>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{profile.hourly_rate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Location</span>
                  <span className="font-semibold">{profile.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold ml-1">4.8</span>
                  </div>
                </div>

                <Button variant="outline" fullWidth className="mt-4">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm">Total Bookings</p>
                    <p className="text-2xl font-bold text-primary">24</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm">This Month</p>
                    <p className="text-2xl font-bold text-accent">₹12,500</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-600 text-sm">Rating</p>
                    <p className="text-2xl font-bold text-primary">4.8</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100/50 p-6">
              <h3 className="text-xl font-semibold text-primary mb-6">Recent Bookings</h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((booking) => (
                  <div key={booking} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Client #{booking}</p>
                        <p className="text-sm text-neutral-600">Event Security • 3 hours</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹1,500</p>
                      <p className="text-sm text-neutral-600">Completed</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button variant="outline">View All Bookings</Button>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100/50 p-6">
              <h3 className="text-xl font-semibold text-primary mb-6">Availability Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Current Status
                  </label>
                  <select className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Working Hours
                  </label>
                  <select className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                    <option value="24/7">24/7 Available</option>
                    <option value="day">Day Shift (6 AM - 6 PM)</option>
                    <option value="night">Night Shift (6 PM - 6 AM)</option>
                    <option value="custom">Custom Hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="primary">Update Availability</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyguardDashboard;