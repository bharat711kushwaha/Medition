import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import JournalEntry from '@/components/JournalEntry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { BookOpen, Plus, X, Search } from 'lucide-react';
import { api } from '@/services/api';

interface Entry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  
  // New entry form state
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryMood, setNewEntryMood] = useState('neutral');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const response = await api.getJournalEntries();
        if (response.data) {
          setEntries(response.data);
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleCreateEntry = async () => {
    if (!newEntryTitle || !newEntryContent) return;
    
    setIsSubmitting(true);
    try {
      const response = await api.createJournalEntry({
        title: newEntryTitle,
        content: newEntryContent,
        mood: newEntryMood
      });
      
      if (response.data) {
        setEntries(prev => [response.data, ...prev]);
        resetNewEntryForm();
        setShowNewEntryDialog(false);
      }
    } catch (error) {
      console.error('Error creating journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetNewEntryForm = () => {
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryMood('neutral');
  };

  const handleEntryClick = (entry: Entry) => {
    setSelectedEntry(entry);
  };

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-24 pb-16">
        <div className="page-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <BookOpen className="w-7 h-7 mr-2 text-calmBlue-500" />
                Journal
              </h1>
              <p className="text-gray-600 mt-1">
                Write down your thoughts, feelings, and reflections
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button onClick={() => setShowNewEntryDialog(true)} className="bg-calmBlue-500 hover:bg-calmBlue-600">
                <Plus className="w-4 h-4 mr-1" />
                New Entry
              </Button>
            </div>
          </div>

          {/* Journal Entries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : filteredEntries.length > 0 ? (
              filteredEntries.map(entry => (
                <JournalEntry 
                  key={entry.id} 
                  entry={entry} 
                  onClick={() => handleEntryClick(entry)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No journal entries yet</h3>
                {searchTerm ? (
                  <p className="text-gray-600">No results found for "{searchTerm}"</p>
                ) : (
                  <p className="text-gray-600">Start writing your thoughts and reflections</p>
                )}
                <Button 
                  onClick={() => setShowNewEntryDialog(true)} 
                  className="mt-4 bg-calmBlue-500 hover:bg-calmBlue-600"
                >
                  Create Your First Entry
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Entry Dialog */}
      <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
        <DialogContent className="max-w-2xl glass-panel">
          <DialogHeader>
            <DialogTitle>New Journal Entry</DialogTitle>
            <DialogDescription>
              Write down your thoughts, feelings, and reflections
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Entry title"
                value={newEntryTitle}
                onChange={e => setNewEntryTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="mood">How are you feeling?</Label>
              <Select 
                value={newEntryMood} 
                onValueChange={setNewEntryMood}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="anxious">Anxious</SelectItem>
                  <SelectItem value="stressed">Stressed</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="content">Journal Entry</Label>
              <Textarea
                id="content"
                placeholder="Write your thoughts here..."
                value={newEntryContent}
                onChange={e => setNewEntryContent(e.target.value)}
                className="mt-1 min-h-[200px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleCreateEntry} 
              disabled={!newEntryTitle || !newEntryContent || isSubmitting}
              className="bg-calmBlue-500 hover:bg-calmBlue-600"
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Entry Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-2xl glass-panel">
          {selectedEntry && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEntry.title}</DialogTitle>
                <DialogDescription>
                  {formatDate(selectedEntry.date)} • {selectedEntry.mood.charAt(0).toUpperCase() + selectedEntry.mood.slice(1)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <p className="whitespace-pre-line">{selectedEntry.content}</p>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button variant="outline">Edit</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journal;

