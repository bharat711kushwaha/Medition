
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Smile, Frown, Meh, AlertCircle, Calendar, Clock } from 'lucide-react';

interface JournalEntryProps {
  entry: {
    id: string;
    date: string;
    title: string;
    content: string;
    mood: string;
  };
  onClick?: () => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onClick }) => {
  const { title, content, date, mood } = entry;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getMoodIcon = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return <Smile className="w-5 h-5 text-calmBlue-500" />;
      case 'sad':
        return <Frown className="w-5 h-5 text-gentleLavender-500" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-warmSand-500" />;
      case 'anxious':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'calm':
        return <Meh className="w-5 h-5 text-mindfulTeal-500" />;
      case 'stressed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card 
      className="hover-lift overflow-hidden cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mt-1">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(date)}
          </div>
          <div className="flex items-center">
            {getMoodIcon(mood)}
            <span className="ml-1 capitalize">{mood}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3">
          {content}
        </p>
      </CardContent>
      <CardFooter className="pt-0 text-sm text-calmBlue-600">
        Read more
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
