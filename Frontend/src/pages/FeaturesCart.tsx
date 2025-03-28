import { Smile, Moon, Brain, Heart } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

// Define TypeScript Interface
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

// FeatureCard Component
const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  return (
    <div 
      className={`p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 ${color}`} 
      data-aos="fade-up"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};

// FeaturesSection Component
export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Take Control of Your <span className="text-blue-600">Mental Wellbeing</span>
          </h2>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Our comprehensive tools help you understand, track, and improve your mental health journey.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Smile className="w-6 h-6 text-blue-600" />}
            title="Mood Tracking"
            description="Record and visualize your emotional patterns to gain insights into your mental wellbeing."
            color="bg-blue-100"
          />
          <FeatureCard 
            icon={<Moon className="w-6 h-6 text-teal-600" />}
            title="Guided Meditation"
            description="Practice mindfulness with guided sessions designed to reduce stress and anxiety."
            color="bg-teal-100"
          />
          <FeatureCard 
            icon={<Brain className="w-6 h-6 text-purple-600" />}
            title="AI Chat Support"
            description="Chat with our AI assistant for emotional support and coping strategies anytime."
            color="bg-purple-100"
          />
          <FeatureCard 
            icon={<Heart className="w-6 h-6 text-pink-600" />}
            title="Journaling"
            description="Express your thoughts and feelings through guided journaling exercises."
            color="bg-pink-100"
          />
        </div>
      </div>
    </section>
  );
}
