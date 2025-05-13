
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, CheckCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoItem } from '@/utils/videoUtils';

interface VideoListProps {
  videos: VideoItem[];
  selectedVideoId?: string;
  onVideoSelect: (videoId: string) => void;
  title?: string;
  watchedVideos?: Set<string>;
}

const VideoList = ({ 
  videos, 
  selectedVideoId, 
  onVideoSelect, 
  title,
  watchedVideos = new Set()
}: VideoListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredVideos = searchQuery
    ? videos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      )}
      
      <div className="relative mb-4">
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-8 rounded-full border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
        />
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No videos found for "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className={`w-full justify-between h-auto py-3 px-4 text-left rounded-xl ${
                  selectedVideoId === video.id ? 'bg-primary/10 border-primary/30 text-primary' : ''
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
      )}
    </div>
  );
};

export default VideoList;
