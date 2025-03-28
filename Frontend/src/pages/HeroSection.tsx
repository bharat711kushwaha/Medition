import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";

import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import meditationAnimation from "../../meditation.json";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Section - Text */}
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your Journey to <span className="text-blue-600">Better Mental Health</span> Starts Here
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
              Track your mood, practice mindfulness, journal your thoughts, and chat with our AI assistant for emotional support whenever you need it.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild className="text-lg px-8 py-6 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 rounded-xl group border-blue-500 hover:bg-blue-100 transition-transform transform hover:scale-105">
                <a href="#features">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Section - Lottie Animation */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center" data-aos="fade-left">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-60 bg-blue-200 rounded-full opacity-50 filter blur-3xl animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-400 rounded-full opacity-50 filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
              
              {/* Lottie Animation */}
              <Lottie animationData={meditationAnimation} className="w-[400px] lg:w-[500px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
