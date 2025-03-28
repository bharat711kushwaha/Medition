import "aos/dist/aos.css";
import AOS from "aos";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Brain, CheckCircle, Smile, Shield, Moon } from 'lucide-react';
import HeroSection from './HeroSection';
import FeaturesCart from './FeaturesCart';
import { useEffect } from "react";

const Index = () => {
  useEffect(() => { AOS.init({ duration: 1000, once: true }); }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection/>
      
      {/* Features Section */}
      <FeaturesCart/>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Heading */}
    <div className="text-center mb-16" data-aos="fade-down">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        How It Works
      </h2>
      <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
        Your mental health journey made simple and effective with our personalized approach.
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid md:grid-cols-3 gap-10">
      
      {/* Step 1 */}
      <div 
        className="bg-white rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        data-aos="fade-up"
      >
        <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-blue-700">1</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Track Your Mood</h3>
        <p className="text-gray-700">
          Log your emotions daily to identify patterns and triggers that affect your mental wellbeing.
        </p>
      </div>

      {/* Step 2 */}
      <div 
        className="bg-white rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        data-aos="fade-up" data-aos-delay="200"
      >
        <div className="w-14 h-14 rounded-full bg-teal-200 flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-teal-700">2</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Practice Mindfulness</h3>
        <p className="text-gray-700">
          Follow guided meditations tailored to your needs, whether it's stress, anxiety, or sleep.
        </p>
      </div>

      {/* Step 3 */}
      <div 
        className="bg-white rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        data-aos="fade-up" data-aos-delay="400"
      >
        <div className="w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-purple-700">3</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Get AI Support</h3>
        <p className="text-gray-700">
          Receive personalized suggestions and emotional support from our AI assistant whenever you need it.
        </p>
      </div>

    </div>
  </div>
</section>
    
      {/* Privacy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center">
      
      {/* Image Section */}
      <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0 relative" data-aos="fade-right">
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-100 rounded-xl opacity-50 filter blur-2xl animate-float"></div>
        <img 
          src="https://images.unsplash.com/photo-1517650862521-d580d5348145?w=800&auto=format&fit=crop&q=80" 
          alt="Privacy" 
          className="relative z-10 rounded-xl shadow-xl transition-transform transform hover:scale-105"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2" data-aos="fade-left">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium text-blue-600">Privacy First</h3>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Your Data Stays Private
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          We prioritize your privacy and confidentiality. Your personal information and health data are encrypted and securely stored.
        </p>

        {/* Privacy Features */}
        <ul className="space-y-4">
          {[
            'End-to-end encryption', 
            'No data sharing with third parties', 
            'Compliance with health data regulations', 
            'Delete your data anytime'
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-calmBlue-500 to-gentleLavender-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Mental Wellness Journey Today</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of people who have improved their mental wellbeing with our platform.
          </p>
          <Button asChild className="bg-white text-calmBlue-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl hover-lift">
            <Link to="/auth">Get Started For Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
