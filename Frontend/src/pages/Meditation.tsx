
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import MeditationPlayer from '@/components/MeditationPlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/services/api';
import { Moon, Search, Clock, Play } from 'lucide-react';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  audioUrl: string;
  imageUrl: string;
}

const Meditation = () => {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [filteredMeditations, setFilteredMeditations] = useState<Meditation[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);

  useEffect(() => {
    const fetchMeditations = async () => {
      setIsLoading(true);
      try {
        const response = await api.getMeditations();
        if (response.data) {
          setMeditations(response.data);
          setFilteredMeditations(response.data);
        }
      } catch (error) {
        console.error('Error fetching meditations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  useEffect(() => {
    let filtered = meditations;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(meditation => 
        meditation.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(meditation => 
        meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meditation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMeditations(filtered);
  }, [activeCategory, searchTerm, meditations]);

  const categories = ['All', 'Mindfulness', 'Relaxation', 'Sleep', 'Anxiety'];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category.toLowerCase());
  };

  const handlePlayMeditation = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-24 pb-16">
        <div className="page-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <Moon className="w-7 h-7 mr-2 text-calmBlue-500" />
              Guided Meditations
            </h1>
            <p className="text-gray-600 mt-1">
              Explore mindfulness practices to calm your mind and reduce stress
            </p>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search meditations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs 
              value={activeCategory} 
              onValueChange={handleCategoryChange}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category.toLowerCase()}
                    className="text-xs sm:text-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Meditation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : filteredMeditations.length > 0 ? (
              filteredMeditations.map(meditation => (
                <Card 
                  key={meditation.id} 
                  className="overflow-hidden hover-lift bg-white border border-gray-200"
                >
                  <div className="relative h-40">
                    <img 
                      src={meditation.imageUrl} 
                      alt={meditation.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center text-white">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{meditation.duration}</span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Button 
                        size="icon" 
                        className="rounded-full w-10 h-10 bg-white text-calmBlue-600 hover:bg-calmBlue-50"
                        onClick={() => handlePlayMeditation(meditation)}
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-calmBlue-50 text-calmBlue-600 mb-2">
                      {meditation.category}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{meditation.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{meditation.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => handlePlayMeditation(meditation)}
                    >
                      Play Meditation
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Moon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No meditations found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No results found for "${searchTerm}"`
                    : "No meditations available for this category yet"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Meditation Player Modal */}
      {selectedMeditation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <MeditationPlayer
            title={selectedMeditation.title}
            duration={selectedMeditation.duration}
            imageUrl={selectedMeditation.imageUrl}
            audioUrl={selectedMeditation.audioUrl}
            onClose={() => setSelectedMeditation(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Meditation;
