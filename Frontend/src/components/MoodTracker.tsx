
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Frown, Meh, AlertCircle, ThumbsUp } from 'lucide-react';
import { api } from '@/services/api';

const moods = [
  { id: 'happy', icon: <ThumbsUp className="w-8 h-8" />, label: 'Happy', color: 'bg-calmBlue-100 text-calmBlue-700 border-calmBlue-200' },
  { id: 'neutral', icon: <Meh className="w-8 h-8" />, label: 'Neutral', color: 'bg-warmSand-100 text-warmSand-700 border-warmSand-200' },
  { id: 'sad', icon: <Frown className="w-8 h-8" />, label: 'Sad', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'anxious', icon: <AlertCircle className="w-8 h-8" />, label: 'Anxious', color: 'bg-gentleLavender-100 text-gentleLavender-700 border-gentleLavender-200' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    try {
      await api.saveMood({ mood: selectedMood, note });
      setIsComplete(true);
      setTimeout(() => {
        setSelectedMood('');
        setNote('');
        setIsComplete(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-panel animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Smile className="w-5 h-5 mr-2 text-calmBlue-500" />
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto w-12 h-12 rounded-full bg-mindfulTeal-100 flex items-center justify-center mb-3">
              <ThumbsUp className="w-6 h-6 text-mindfulTeal-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Mood Tracked</h3>
            <p className="text-gray-600 mt-1">Thanks for sharing how you're feeling today.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    selectedMood === mood.id
                      ? `${mood.color} border-2`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`mb-2 ${selectedMood === mood.id ? '' : 'text-gray-600'}`}>
                    {mood.icon}
                  </div>
                  <span className="font-medium text-sm">{mood.label}</span>
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Add a note about how you're feeling... (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px] mb-4 focus:border-calmBlue-500"
            />

            <Button
              onClick={handleSubmit}
              disabled={!selectedMood || isSubmitting}
              className="w-full bg-calmBlue-500 hover:bg-calmBlue-600"
            >
              {isSubmitting ? 'Saving...' : 'Save Mood'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
