
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, RefreshCcw } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id?: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setIsInitializing(true);
        console.log('Fetching chat history...');
        const response = await api.getChatHistory();
        
        if (response.error) {
          console.error('Error fetching chat history:', response.error);
          toast({
            title: 'Error',
            description: 'Failed to load chat history. Please try again.',
            variant: 'destructive',
          });
          // Add a default welcome message
          setMessages([{
            sender: 'ai',
            message: "Hi there! I'm your mental wellness companion. How are you feeling today?"
          }]);
        } else if (response.data && Array.isArray(response.data)) {
          console.log('Chat history loaded:', response.data);
          setMessages(response.data);
        } else {
          console.log('No chat history returned, setting default message');
          // Add a default welcome message
          setMessages([{
            sender: 'ai',
            message: "Hi there! I'm your mental wellness companion. How are you feeling today?"
          }]);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
        // Add a default welcome message
        setMessages([{
          sender: 'ai',
          message: "Hi there! I'm your mental wellness companion. How are you feeling today?"
        }]);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchChatHistory();
  }, []);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      message: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      console.log("Sending message to API:", newMessage);
      const response = await api.sendMessage(newMessage);
      console.log("AI Response received:", response);
      
      if (response.error) {
        console.error('Error from AI:', response.error);
        toast({
          title: 'Error',
          description: 'Failed to get response from AI. Please try again.',
          variant: 'destructive',
        });
        
        // Add a fallback error message
        setMessages((prev) => [...prev, {
          sender: 'ai',
          message: "I'm sorry, I encountered an error processing your message. Please try again later."
        }]);
      } else if (response.data) {
        console.log("AI response data:", response.data);
        setMessages((prev) => [...prev, response.data]);
      } else {
        console.error('No response data received');
        // Add a fallback error message
        setMessages((prev) => [...prev, {
          sender: 'ai',
          message: "I'm sorry, I couldn't generate a response. Please try again later."
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to communicate with the AI. Please try again.',
        variant: 'destructive',
      });
      
      // Add a fallback error message
      setMessages((prev) => [...prev, {
        sender: 'ai',
        message: "I'm sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = async () => {
    try {
      setIsLoading(true);
      await api.resetChatHistory(); // Reset chat history via API
      
      // Add the welcome message back
      setMessages([{
        sender: 'ai',
        message: "Hi there! I'm your mental wellness companion. How are you feeling today?"
      }]);
      
      toast({
        title: 'Chat Reset',
        description: 'Started a new conversation.',
      });
    } catch (error) {
      console.error("Error resetting chat:", error);
      toast({
        title: 'Error',
        description: 'Failed to reset chat. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg">
      {/* Chat header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-calmBlue-100 flex items-center justify-center mr-3">
            <Bot className="w-5 h-5 text-calmBlue-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Wellness Assistant</h3>
            <p className="text-sm text-gray-600">AI-powered support</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={resetChat}
          title="Start new conversation"
          className="text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        {isInitializing ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-calmBlue-300 animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-calmBlue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-calmBlue-700 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm text-gray-500">Loading conversation...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-calmBlue-500 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.sender === 'ai' ? (
                      <Bot className="w-4 h-4 mr-1 text-calmBlue-500" />
                    ) : (
                      <User className="w-4 h-4 mr-1 text-white" />
                    )}
                    <span className={`text-xs ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                      {msg.sender === 'ai' ? 'Wellness Assistant' : 'You'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-gray-200 rounded-tl-none shadow-sm">
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 mr-1 text-calmBlue-500" />
                    <span className="text-xs text-gray-500">Wellness Assistant</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[50px] resize-none bg-gray-50 border-gray-200 focus:border-calmBlue-500 focus:ring-1 focus:ring-calmBlue-500"
            disabled={isLoading || isInitializing}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading || isInitializing}
            className="bg-calmBlue-500 hover:bg-calmBlue-600 transition-colors duration-200"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This AI assistant provides emotional support but is not a replacement for professional mental health care.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;