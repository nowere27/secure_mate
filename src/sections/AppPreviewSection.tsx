import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import { appScreenshots } from '../data';
import { Smartphone, Shield, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const AppPreviewSection: React.FC = () => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 pb-36 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0" style={{ opacity: 0.4 }}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent/10 to-transparent blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse delay-700"></div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern rotate-3"></div>
          <div className="absolute top-0 left-0 w-full h-full transform bg-grid-pattern -rotate-3"></div>
        </div>
      </div>

      <div className="relative z-10 container-custom">
        <SectionTitle 
          title="Mobile App Preview"
          subtitle="Take a look at our intuitive and user-friendly mobile application that puts security at your fingertips."
          centered={true}
        />
        
        <div 
          ref={ref}
          className="max-w-5xl mx-auto mt-16"
        >
          <Carousel>
            {appScreenshots.map((screenshot) => (
              <div key={screenshot.id} className="px-4">
                <div className="relative p-8 transition-all duration-500 border group bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl border-neutral-100/50">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 transition-all duration-300 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl group-hover:border-accent/50 group-hover:scale-105"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-300 border-b-2 border-r-2 border-primary/20 rounded-br-2xl group-hover:border-accent/50 group-hover:scale-105"></div>

                  <div className="flex flex-col items-center gap-8 md:flex-row">
                    {/* Phone Frame */}
                    <div className="relative w-full md:w-1/2">
                      <div className="relative w-64 mx-auto md:w-72">
                        {/* Phone Shadow & Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] transform rotate-2 scale-105 blur-xl opacity-70 group-hover:rotate-3 transition-transform duration-500"></div>
                        
                        {/* Phone Frame */}
                        <div className="relative border-[12px] border-primary/90 rounded-[3rem] p-2 bg-neutral-900 shadow-xl transform group-hover:-rotate-2 transition-transform duration-500">
                          {/* Notch */}
                          <div className="absolute top-0 w-24 h-6 transform -translate-x-1/2 left-1/2 bg-primary/90 rounded-b-xl"></div>
                          {/* Status Bar */}
                          <div className="absolute w-16 h-1 transform -translate-x-1/2 rounded-full top-1 left-1/2 bg-neutral-700"></div>
                          
                          {/* Screen Content */}
                          <div className="relative overflow-hidden rounded-2xl">
                            <img 
                              src={screenshot.image}
                              alt={screenshot.title}
                              className="w-full transition-transform duration-500 transform group-hover:scale-105"
                            />
                            {/* Screen Overlay */}
                            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100"></div>
                          </div>
                        </div>

                        {/* Floating Feature Cards */}
                        <div className="absolute transition-all duration-500 delay-100 transform translate-x-8 opacity-0 -right-16 top-10 group-hover:translate-x-0 group-hover:opacity-100">
                          <div className="p-3 bg-white rounded-lg shadow-lg">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                                <Shield className="w-4 h-4 text-accent" />
                              </div>
                              <span className="text-sm font-medium text-primary">Verified Guards</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute transition-all duration-500 delay-200 transform -translate-x-8 opacity-0 -left-16 bottom-10 group-hover:translate-x-0 group-hover:opacity-100">
                          <div className="p-3 bg-white rounded-lg shadow-lg">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                <Clock className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-primary">24/7 Available</span>
                            </div>
                          </div>
                        </div>
                    </div>
                    </div>
                    
                    {/* Description */}
                    <div className="w-full text-center md:w-1/2 md:text-left">
                      <div className="relative inline-flex items-center mb-4">
                        <div className="absolute inset-0 transition-transform duration-300 transform scale-150 rounded-full bg-accent/10 group-hover:scale-175"></div>
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 transition-colors duration-300 bg-white border rounded-full shadow-md border-accent/20 group-hover:border-accent/40">
                          <Smartphone className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <h4 className="mb-4 text-2xl font-semibold transition-colors duration-300 text-primary group-hover:text-accent">{screenshot.title}</h4>
                      <p className="leading-relaxed transition-colors duration-300 text-neutral-600 group-hover:text-neutral-700">{screenshot.description}</p>
                      
                      {/* Feature Tags */}
                      <div className="flex flex-wrap justify-center gap-2 mt-6 md:justify-start">
                        <span className="px-3 py-1 text-sm rounded-full bg-primary/5 text-primary">Easy to Use</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-accent/5 text-accent">Real-time Updates</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-primary/5 text-primary">Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;