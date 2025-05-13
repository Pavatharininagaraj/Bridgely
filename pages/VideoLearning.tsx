
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoPlayer from '@/components/VideoPlayer';
import VideoList from '@/components/VideoList';
import VideoCategories from '@/components/VideoCategories';
import { 
  getVideoCategories,
  getAllVideos,
  findVideoById,
  getRelatedVideos,
  VideoItem 
} from '@/utils/videoUtils';
import { Button } from '@/components/ui/button';
import { BookOpen, ListVideo } from 'lucide-react';

const VideoLearning = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get('video') || '';
  
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideoItem[]>([]);
  const [categories] = useState(getVideoCategories());
  const [allVideos] = useState(getAllVideos());
  
  // Track learning progress
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  
  // Load video when URL changes
  useEffect(() => {
    if (videoId) {
      const video = findVideoById(videoId);
      if (video) {
        setSelectedVideo(video);
        setRelatedVideos(getRelatedVideos(videoId));
      } else {
        // Invalid video ID, reset to a default video
        toast.error('Video not found');
        const defaultVideo = allVideos[0];
        if (defaultVideo) {
          handleVideoSelect(defaultVideo.id);
        }
      }
    } else if (allVideos.length > 0) {
      // No video selected, select the first video
      handleVideoSelect(allVideos[0].id);
    }
  }, [videoId, allVideos]);
  
  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('signlang-watched-videos');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setWatchedVideos(new Set(parsed));
      } catch (error) {
        console.error('Failed to parse saved progress', error);
      }
    }
  }, []);
  
  // Save progress to localStorage when it changes
  useEffect(() => {
    if (watchedVideos.size > 0) {
      localStorage.setItem(
        'signlang-watched-videos', 
        JSON.stringify(Array.from(watchedVideos))
      );
    }
  }, [watchedVideos]);
  
  const handleVideoSelect = (id: string) => {
    // Update the URL with the selected video
    setSearchParams({ video: id });
  };
  
  const handleVideoEnd = () => {
    // Mark video as watched
    if (selectedVideo) {
      setWatchedVideos(prev => {
        const updated = new Set(prev);
        updated.add(selectedVideo.id);
        return updated;
      });
      
      toast.success(`Completed: ${selectedVideo.title}`);
    }
  };
  
  const isVideoWatched = (id: string) => {
    return watchedVideos.has(id);
  };
  
  const calculateProgress = () => {
    if (allVideos.length === 0) return 0;
    return Math.round((watchedVideos.size / allVideos.length) * 100);
  };
  
  const resetProgress = () => {
    setWatchedVideos(new Set());
    localStorage.removeItem('signlang-watched-videos');
    toast.info('Learning progress has been reset');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Learning</h1>
            <p className="text-gray-600">
              Watch sign language videos to learn common signs and phrases.
            </p>
          </div>
          
          <div className="flex items-center bg-gray-100 p-1 rounded-full">
            <div className="text-sm font-medium px-4">
              Progress: {calculateProgress()}%
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetProgress}
              className="rounded-full text-xs h-8"
            >
              Reset
            </Button>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Video Player Section */}
        <motion.div 
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {selectedVideo ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <VideoPlayer 
                  src={selectedVideo.path}
                  title={selectedVideo.title}
                  onEnded={handleVideoEnd}
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedVideo.title}</h2>
                <p className="text-gray-700 mb-4">
                  Practice this sign by watching the video multiple times and mimicking the movements.
                  Try to use it in sentences with other signs you've learned.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => {
                      const video = document.querySelector('video');
                      if (video) {
                        video.currentTime = 0;
                        video.play().catch(err => {
                          console.error('Play error:', err);
                          toast.error('Failed to play video. Please try again.');
                        });
                      }
                    }}
                  >
                    Watch Again
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (isVideoWatched(selectedVideo.id)) {
                        setWatchedVideos(prev => {
                          const updated = new Set(prev);
                          updated.delete(selectedVideo.id);
                          return updated;
                        });
                        toast.info(`Marked "${selectedVideo.title}" as not watched`);
                      } else {
                        setWatchedVideos(prev => {
                          const updated = new Set(prev);
                          updated.add(selectedVideo.id);
                          return updated;
                        });
                        toast.success(`Marked "${selectedVideo.title}" as watched`);
                      }
                    }}
                  >
                    {isVideoWatched(selectedVideo.id) ? 'Mark as Unwatched' : 'Mark as Watched'}
                  </Button>
                </div>
              </div>
              
              {relatedVideos.length > 0 && (
                <VideoList 
                  videos={relatedVideos} 
                  selectedVideoId={selectedVideo.id}
                  onVideoSelect={handleVideoSelect}
                  title="Related Signs"
                  watchedVideos={watchedVideos}
                />
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-gray-500 text-lg mb-4">Select a video to start learning</p>
            </div>
          )}
        </motion.div>
        
        {/* Sidebar */}
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="categories">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="categories">
                <BookOpen className="w-4 h-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="all">
                <ListVideo className="w-4 h-4 mr-2" />
                All Videos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-0">
              <VideoCategories 
                categories={categories}
                selectedVideoId={selectedVideo?.id}
                onVideoSelect={handleVideoSelect}
                watchedVideos={watchedVideos}
              />
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <VideoList 
                videos={allVideos}
                selectedVideoId={selectedVideo?.id}
                onVideoSelect={handleVideoSelect}
                title="All Sign Videos"
                watchedVideos={watchedVideos}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoLearning;
