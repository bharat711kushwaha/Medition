import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from '@/services/api';
import { Loader, Heart, MessageSquare, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import PostList from '@/components/community/PostList';
import CreatePostForm from '@/components/community/CreatePostForm';

const CATEGORIES = ['All', 'Anxiety', 'Depression', 'Stress', 'Sleep', 'Relationships', 'Work', 'General'];

const Community = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      toast.error('Please login to access the community');
    }
  }, [isAuthenticated, navigate]);

  // Fetch posts with selected category filter
  const { data: postsData, isLoading, error, refetch } = useQuery({
    queryKey: ['posts', currentPage, selectedCategory],
    queryFn: () => api.getPosts(currentPage, 10, selectedCategory || undefined),
    enabled: isAuthenticated,
  });

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? null : category);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle post creation
  const handlePostCreated = () => {
    setIsCreatePostOpen(false);
    refetch();
    toast.success('Your post has been shared with the community');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="page-container pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Support</h1>
          
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Share Your Story
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Share with the Community</DialogTitle>
              </DialogHeader>
              <CreatePostForm onPostCreated={handlePostCreated} />
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8 overflow-auto pb-2">
          <div className="flex space-x-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === (category === 'All' ? null : category) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Posts List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-primary h-8 w-8" />
          </div>
        ) : error ? (
          <Card className="p-8 text-center">
            <p className="text-red-500">Error loading posts. Please try again later.</p>
          </Card>
        ) : postsData?.data?.posts?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 mb-4">No posts in this category yet.</p>
            <Button onClick={() => setIsCreatePostOpen(true)}>Be the first to share</Button>
          </Card>
        ) : (
          <PostList 
            posts={postsData?.data?.posts || []} 
            currentPage={currentPage}
            totalPages={postsData?.data?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Community;
