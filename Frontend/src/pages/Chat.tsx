
import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Bot } from 'lucide-react';

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-16">
        <div className="page-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <Bot className="w-7 h-7 mr-2 text-calmBlue-500" />
              AI Wellness Chat
            </h1>
            <p className="text-gray-600 mt-1">
              Chat with our AI assistant for emotional support and mental health insights
            </p>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto h-[70vh]">
            <ChatInterface />
          </div>
          
          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mt-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> This AI chat is designed to provide emotional support and general wellness advice. 
              It is not a replacement for professional mental health care. If you're experiencing a crisis or need immediate help, 
              please contact a mental health professional or a crisis helpline.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
