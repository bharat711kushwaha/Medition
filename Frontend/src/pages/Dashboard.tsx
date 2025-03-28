import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import MoodTracker from '@/components/MoodTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, ArrowRight, Moon, Calendar, Smile } from 'lucide-react';
import { api } from '@/services/api';

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note: string;
}

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  imageUrl: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [recentMeditations, setRecentMeditations] = useState<Meditation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const moodResponse = await api.getMoodData();
        if (moodResponse.data) {
          setMoodEntries(moodResponse.data);
        }

        const meditationsResponse = await api.getMeditations();
        if (meditationsResponse.data) {
          setRecentMeditations(meditationsResponse.data.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getDayName = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-24 pb-16">
        <div className="page-container">
          <div className="mb-8">
            <p className="text-gray-600">{getDayName()}</p>
            <h1 className="text-3xl font-bold mt-1">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-gray-600 mt-2">
              Track your mood, meditate, and take care of your mental health today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MoodTracker />

              <Card className="glass-panel">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <Smile className="w-5 h-5 mr-2 text-calmBlue-500" />
                    Recent Moods
                  </CardTitle>
                  <CardDescription>
                    Your mood history from the past few days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  ) : moodEntries.length > 0 ? (
                    <div className="space-y-3">
                      {moodEntries.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center">
                              <span className="font-medium capitalize">{entry.mood}</span>
                              {entry.note && (
                                <span className="ml-2 text-sm text-gray-600 line-clamp-1">
                                  - {entry.note}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No mood entries yet. Start tracking your mood above.
                    </div>
                  )}

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View Mood History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/journal">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Write in Journal
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/meditation">
                      <Moon className="w-4 h-4 mr-2" />
                      Start Meditation
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/chat">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to AI Assistant
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Moon className="w-5 h-5 mr-2 text-calmBlue-500" />
                    Recommended Meditations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  ) : recentMeditations.length > 0 ? (
                    <div className="space-y-4">
                      {recentMeditations.map((meditation) => (
                        <Link 
                          key={meditation.id} 
                          to={`/meditation?id=${meditation.id}`}
                          className="block group"
                        >
                          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-calmBlue-300 transition-colors">
                            <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                              <img
                                src={meditation.imageUrl}
                                alt={meditation.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium group-hover:text-calmBlue-600 transition-colors">
                                {meditation.title}
                              </h4>
                              <p className="text-sm text-gray-600">{meditation.duration}</p>
                              <p className="text-xs text-gray-500 mt-1">{meditation.category}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No meditations found.
                    </div>
                  )}

                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/meditation" className="flex items-center justify-center">
                        <span>Explore All Meditations</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
