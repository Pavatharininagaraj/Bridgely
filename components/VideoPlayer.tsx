
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface VideoPlayerProps {
  src: string;
  title: string;
  onEnded?: () => void;
  autoPlay?: boolean;
}

const VideoPlayer = ({ src, title, onEnded, autoPlay = false }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Fix path for video src
  const videoSrc = src.startsWith('/') ? src.substring(1) : src;
  
  // Load the video
  useEffect(() => {
    if (videoRef.current) {
      setPlaying(autoPlay);
      setCurrentTime(0);
      setError(null);
      
      if (autoPlay) {
        videoRef.current.play().catch((err) => {
          // Autoplay was prevented
          setPlaying(false);
          console.error('Play error:', err);
          toast.error('Autoplay blocked by browser. Click play to start the video.');
        });
      }
    }
  }, [src, autoPlay]);
  
  // Update time display
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const timeUpdate = () => setCurrentTime(video.currentTime);
    const durationChange = () => setDuration(video.duration);
    const videoEnded = () => {
      setPlaying(false);
      if (onEnded) onEnded();
    };
    
    const handleError = (e: ErrorEvent) => {
      console.error('Video error:', e);
      setError('Failed to load video. Please try again.');
      toast.error('Failed to load video. Please check the file path.');
    };
    
    video.addEventListener('timeupdate', timeUpdate);
    video.addEventListener('durationchange', durationChange);
    video.addEventListener('ended', videoEnded);
    video.addEventListener('error', handleError as any);
    
    return () => {
      video.removeEventListener('timeupdate', timeUpdate);
      video.removeEventListener('durationchange', durationChange);
      video.removeEventListener('ended', videoEnded);
      video.removeEventListener('error', handleError as any);
    };
  }, [onEnded]);
  
  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.error('Play error:', err);
        toast.error('Failed to play video. Please try again.');
      });
    }
    
    setPlaying(!playing);
  };
  
  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return;
    
    const newVolume = value[0];
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      videoRef.current.muted = true;
      setMuted(true);
    } else if (muted) {
      videoRef.current.muted = false;
      setMuted(false);
    }
  };
  
  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    
    const newTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const restartVideo = () => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    
    if (!playing) {
      videoRef.current.play().catch((err) => {
        console.error('Play error:', err);
        toast.error('Failed to restart video. Please try again.');
      });
      setPlaying(true);
    }
  };
  
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!isFullscreen) {
      playerRef.current.requestFullscreen().catch(() => {
        toast.error('Failed to enter fullscreen. Please try again.');
      });
    } else {
      document.exitFullscreen().catch(() => {
        toast.error('Failed to exit fullscreen. Please try again.');
      });
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 relative" ref={playerRef}>
      {error ? (
        <div className="w-full aspect-video flex items-center justify-center bg-gray-800 text-white p-4 text-center">
          <div>
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 text-white border-white hover:bg-white/20"
              onClick={() => setError(null)}
            >
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={videoSrc}
          title={title}
          muted={muted}
          playsInline
          preload="metadata"
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
        <h3 className="font-medium text-sm md:text-base mb-2 truncate">{title}</h3>
        
        <div className="flex items-center space-x-1 mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <span className="text-xs whitespace-nowrap ml-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={restartVideo}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => skip(-5)}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => skip(5)}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Slider
                value={[muted ? 0 : volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
