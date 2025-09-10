import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Clock, Shield, CheckCircle, Mail, Phone } from 'lucide-react';

const BodyguardPending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Status Icon */}
          <div className="relative mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-4">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
              <Clock className="relative w-12 h-12 text-accent animate-pulse" />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
            <h1 className="text-3xl font-bold text-primary mb-4">
              Application Under Review
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Your profile has been submitted and is under review. You'll be notified once approved by the admin.
            </p>

            {/* Status Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-success">Submitted</span>
              </div>
              
              <div className="w-16 h-0.5 bg-accent animate-pulse"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-accent">Under Review</span>
              </div>
              
              <div className="w-16 h-0.5 bg-neutral-300"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-neutral-500" />
                </div>
                <span className="ml-2 text-sm font-medium text-neutral-500">Approved</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-primary mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-600">
                    <strong>Document Verification:</strong> Our team will verify your ID proof and credentials
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-600">
                    <strong>Background Check:</strong> We'll conduct a thorough background verification
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-neutral-600">
                    <strong>Approval & Onboarding:</strong> Once approved, you'll get access to your dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Timeline */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 mb-8">
              <p className="text-sm text-neutral-700">
                <strong>Expected Review Time:</strong> 24-48 hours
              </p>
            </div>

            {/* Contact Support */}
            <div className="border-t border-neutral-200 pt-6">
              <h4 className="font-semibold text-primary mb-4">Need Help?</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@securemate.in"
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
            >
              Check Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyguardPending;