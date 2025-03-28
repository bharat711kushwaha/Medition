
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';

interface MeditationPlayerProps {
  title: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  onClose: () => void;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({
  title,
  duration,
  imageUrl,
  audioUrl,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioUrl);
    
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    // Get duration when metadata is loaded
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setTotalDuration(audioRef.current.duration);
      }
    };
    
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      audioRef.current.play();
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = (newValue: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = newValue[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const restartMeditation = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      togglePlayPause();
    }
  };
  
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 0.5) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-panel animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-lg overflow-hidden mb-6 shadow-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 mb-6">{duration}</p>
          
          {/* Progress bar */}
          <div className="w-full mb-2">
            <Slider
              value={[currentTime]}
              max={totalDuration || 100}
              step={1}
              onValueChange={handleTimeUpdate}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex items-center justify-center space-x-6 my-4">
            <button 
              onClick={restartMeditation}
              className="text-gray-700 hover:text-calmBlue-600 transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="w-14 h-14 rounded-full bg-calmBlue-500 text-white flex items-center justify-center hover:bg-calmBlue-600 transition-colors"
            >
              {isPlaying ? 
                <Pause className="w-7 h-7" /> : 
                <Play className="w-7 h-7 ml-1" />
              }
            </button>
            
            <button className="text-gray-700 hover:text-calmBlue-600 transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
          
          {/* Volume control */}
          <div className="flex items-center w-full max-w-xs space-x-3 mb-4">
            <VolumeIcon />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="mt-2"
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationPlayer;
