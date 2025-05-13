
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { CheckCircle, Play, FolderOpen } from 'lucide-react';
import { VideoCategory, VideoItem } from '@/utils/videoUtils';

interface VideoCategoriesProps {
  categories: VideoCategory[];
  selectedVideoId?: string;
  onVideoSelect: (videoId: string) => void;
  watchedVideos?: Set<string>;
}

const VideoCategories = ({ 
  categories, 
  selectedVideoId, 
  onVideoSelect,
  watchedVideos = new Set()
}: VideoCategoriesProps) => {
  // Keep track of expanded categories
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['basic']);
  
  // Toggle a category's expanded state
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Check if a category is expanded
  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };
  
  // Calculate how many videos are watched in each category
  const getWatchedCount = (videos: VideoItem[]) => {
    return videos.filter(video => watchedVideos.has(video.id)).length;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FolderOpen className="w-5 h-5 mr-2 text-primary" />
        Categories
      </h2>
      
      <Accordion 
        type="multiple" 
        value={expandedCategories}
        className="space-y-2"
      >
        {categories.map((category) => {
          const watchedCount = getWatchedCount(category.videos);
          const totalCount = category.videos.length;
          const isCompleted = watchedCount === totalCount && totalCount > 0;
          
          return (
            <AccordionItem 
              key={category.id} 
              value={category.id}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <AccordionTrigger 
                onClick={() => toggleCategory(category.id)}
                className="hover:no-underline px-3 py-2"
              >
                <div className="text-sm font-medium flex items-center">
                  <span className="text-left">{category.name}</span>
                  <div className="ml-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {watchedCount}/{totalCount}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {category.videos.map((video) => (
                    <motion.div 
                      key={video.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full justify-between rounded-lg ${
                          selectedVideoId === video.id 
                            ? 'bg-primary/10 border-primary/30 text-primary' 
                            : ''
                        }`}
                        onClick={() => onVideoSelect(video.id)}
                      >
                        <div className="flex items-center">
                          <Play className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="truncate">{video.title}</span>
                        </div>
                        {watchedVideos.has(video.id) && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default VideoCategories;
