import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import logoImage from '../assets/images/Subtract.png';
import heroImage from '../assets/images/hero.png';

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { user } = useAuth();
  
  return (
    <section 
      id="home" 
      className="relative pb-12 overflow-hidden pt-14 sm:pt-16 md:pt-32 md:pb-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute w-48 h-48 rounded-full -right-5 -top-5 md:w-72 md:h-72 md:-right-10 md:-top-10 bg-accent blur-3xl opacity-20"></div>
        <div className="absolute w-48 h-48 rounded-full -left-5 top-20 md:w-72 md:h-72 md:-left-10 md:top-40 bg-primary blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 px-4 container-custom md:px-6">
        <div className="flex flex-col items-center lg:flex-row">
          {/* Hero Text Content */}
          <div 
            ref={ref}
            className={`w-full lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-full mb-4 sm:justify-start md:mb-6">
              <div className="inline-flex items-center px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-full bg-primary/10 text-primary animate-pulse-slow">
                <Shield size={11} className="mr-1.5" />
                <span>India's first on-demand bodyguard app</span>
              </div>
            </div>
            
            <h1 className="mb-3 text-[26px] sm:text-2xl font-bold leading-tight md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl">
              Your Personal Security, 
              <span className="block mt-0.5 sm:mt-1 text-accent">One Tap Away</span>
            </h1>
            
            <p className="max-w-[260px] sm:max-w-lg mx-auto mb-5 text-[13px] sm:text-sm md:mb-8 md:text-lg text-neutral-600 lg:mx-0">
              Experience premium security with our elite, background-verified guards.
              Available 24/7 for your protection.
            </p>
            
            <div className="flex flex-row justify-center gap-2 md:gap-4 lg:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1 sm:flex-none text-[11px] leading-none sm:text-sm md:text-base py-2 sm:py-2.5 px-2 sm:px-4 min-w-[120px] sm:min-w-0"
                onClick={() => {
                  if (user) {
                    // User is already on dashboard, scroll to top or refresh
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.querySelector('[data-auth-trigger]')?.click();
                  }
                }}
              >
                {user ? 'Find Guards' : 'Get Started'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 sm:flex-none text-[11px] leading-none sm:text-sm md:text-base py-2 sm:py-2.5 px-2 sm:px-4 min-w-[120px] sm:min-w-0"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            className={`w-full mt-8 sm:mt-12 lg:mt-0 max-w-[240px] sm:max-w-[320px] md:max-w-md lg:w-1/2 transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative mx-auto">
              {/* Phone Frame */}
              <div className="relative z-10 mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl">
                <div className="p-2 md:p-3">
                  <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] w-full mx-auto">
                    <img 
                      src={heroImage}
                      alt="SecureMate App Interface" 
                      className="w-full h-auto"
                    />
                    {/* App UI Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-6">
                        <div className="p-2.5 md:p-4 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10">
                          <div className="flex items-center">
                            <div className="relative w-8 h-8 md:w-14 md:h-14">
                              <div className="absolute inset-0 rounded-full bg-white/90"></div>
                              <div className="relative w-full h-full flex items-center justify-center p-1.5 md:p-2.5">
                                <img src={logoImage} alt="" className="object-contain w-full h-full" />
                              </div>
                            </div>
                            <div className="ml-2 text-white md:ml-3">
                              <p className="text-sm font-semibold md:text-lg">Guard Assigned</p>
                              <p className="text-[10px] md:text-sm opacity-90">Arriving in 15 mins</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Feature Cards */}
                <div className="absolute -right-4 top-1/3 p-2.5 bg-white shadow-lg rounded-xl transform -rotate-3 hover:rotate-0 transition-transform lg:hidden">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Elite Guards</p>
                      <div className="flex text-[10px] text-yellow-400">★★★★★</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 bottom-1/3 p-2.5 bg-white shadow-lg rounded-xl transform rotate-3 hover:rotate-0 transition-transform lg:hidden">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary">
                      <Clock className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500">Response Time</p>
                      <p className="text-xs font-semibold">15 mins</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Floating Cards */}
              <div className="absolute z-20 hidden p-4 bg-white shadow-lg lg:block top-10 -right-24 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Guard Verified</p>
                    <div className="flex text-sm text-yellow-400">★★★★★</div>
                  </div>
                </div>
              </div>

              <div className="absolute z-20 hidden p-4 bg-white shadow-lg lg:block -bottom-10 -left-24 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Response Time</p>
                    <p className="font-semibold">Within 1 hour</p>
                  </div>
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute inset-y-4 -inset-x-6 md:inset-y-8 md:-inset-x-12 bg-gradient-to-r from-primary to-accent opacity-10 rounded-[3rem] md:rounded-[4rem] rotate-6 z-0"></div>
              <div className="absolute inset-y-4 -inset-x-6 md:inset-y-8 md:-inset-x-12 bg-gradient-to-r from-accent to-primary opacity-10 rounded-[3rem] md:rounded-[4rem] -rotate-6 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;