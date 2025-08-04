import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created successfully!');
          setTimeout(() => {
            handleClose();
          }, 1500);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Signed in successfully!');
          setTimeout(() => {
            handleClose();
          }, 800);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="relative p-6 text-white bg-gradient-to-br from-primary to-primary-dark">
          <button
            onClick={handleClose}
            className="absolute p-2 transition-colors rounded-full top-4 right-4 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center">
            {mode === 'signin' ? 'Welcome Back' : 'Join SecureMate'}
          </h2>
          <p className="mt-2 text-center text-white/80">
            {mode === 'signin' 
              ? 'Sign in to book your personal security' 
              : 'Create your account to get started'
            }
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="flex items-center p-3 mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="group">
                <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-neutral-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 transition-colors duration-300 text-neutral-400 group-focus-within:text-primary" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 pl-10 transition-all duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="group">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 transition-colors duration-300 text-neutral-400 group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 transition-all duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 transition-colors duration-300 text-neutral-400 group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 pr-10 transition-all duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-primary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="mt-1 text-xs text-neutral-500">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={switchMode}
                className="ml-1 font-medium transition-colors text-primary hover:text-primary-dark"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;