export interface VideoCategory {
  id: string;
  name: string;
  videos: VideoItem[];
}

export interface VideoItem {
  id: string;
  title: string;
  path: string;
}

// Extract video categories and organize them
const extractCategories = (): VideoCategory[] => {
  // Numbers
  const numbers: VideoItem[] = [
    { id: 'num-0', title: '0', path: '/Videos/0.mp4' },
    { id: 'num-1', title: '1', path: '/Videos/1.mp4' },
    { id: 'num-2', title: '2', path: '/Videos/2.mp4' },
    { id: 'num-3', title: '3', path: '/Videos/3.mp4' },
    { id: 'num-4', title: '4', path: '/Videos/4.mp4' },
    { id: 'num-5', title: '5', path: '/Videos/5.mp4' },
    { id: 'num-6', title: '6', path: '/Videos/6.mp4' },
    { id: 'num-7', title: '7', path: '/Videos/7.mp4' },
    { id: 'num-8', title: '8', path: '/Videos/8.mp4' },
    { id: 'num-9', title: '9', path: '/Videos/9.mp4' }
  ];

  // Basic words
  const basic: VideoItem[] = [
    { id: 'basic-hello', title: 'Hello', path: '/Videos/Hello.mp4' },
    { id: 'basic-bye', title: 'Bye', path: '/Videos/Bye.mp4' },
    { id: 'basic-thank-you', title: 'Thank You', path: '/Videos/Thank.mp4' }
  ];

  // Questions
  const questions: VideoItem[] = [
    { id: 'q-what', title: 'What', path: '/Videos/What.mp4' },
    { id: 'q-where', title: 'Where', path: '/Videos/Where.mp4' },
    { id: 'q-who', title: 'Who', path: '/Videos/Who.mp4' },
    { id: 'q-why', title: 'Why', path: '/Videos/Why.mp4' },
    { id: 'q-when', title: 'When', path: '/Videos/When.mp4' },
    { id: 'q-how', title: 'How', path: '/Videos/How.mp4' },
    { id: 'q-which', title: 'Which', path: '/Videos/Which.mp4' },
    { id: 'q-whose', title: 'Whose', path: '/Videos/Whose.mp4' }
  ];

  // Common words
  const common: VideoItem[] = [
    { id: 'common-and', title: 'And', path: '/Videos/And.mp4' },
    { id: 'common-but', title: 'But', path: '/Videos/But.mp4' },
    { id: 'common-at', title: 'At', path: '/Videos/At.mp4' },
    { id: 'common-from', title: 'From', path: '/Videos/From.mp4' },
    { id: 'common-to', title: 'To', path: '/Videos/To.mp4' },
    { id: 'common-with', title: 'With', path: '/Videos/With.mp4' },
    { id: 'common-without', title: 'Without', path: '/Videos/Without.mp4' }
  ];

  // Actions
  const actions: VideoItem[] = [
    { id: 'action-go', title: 'Go', path: '/Videos/Go.mp4' },
    { id: 'action-come', title: 'Come', path: '/Videos/Come.mp4' },
    { id: 'action-walk', title: 'Walk', path: '/Videos/Walk.mp4' },
    { id: 'action-eat', title: 'Eat', path: '/Videos/Eat.mp4' },
    { id: 'action-work', title: 'Work', path: '/Videos/Work.mp4' },
    { id: 'action-help', title: 'Help', path: '/Videos/Help.mp4' },
    { id: 'action-wash', title: 'Wash', path: '/Videos/Wash.mp4' },
    { id: 'action-can', title: 'Can', path: '/Videos/Can.mp4' },
    { id: 'action-cannot', title: 'Cannot', path: '/Videos/Cannot.mp4' },
    { id: 'action-do', title: 'Do', path: '/Videos/Do.mp4' },
    { id: 'action-do-not', title: 'Do Not', path: '/Videos/Do Not.mp4' }
  ];

  // Descriptive
  const descriptive: VideoItem[] = [
    { id: 'desc-good', title: 'Good', path: '/Videos/Good.mp4' },
    { id: 'desc-great', title: 'Great', path: '/Videos/Great.mp4' },
    { id: 'desc-better', title: 'Better', path: '/Videos/Better.mp4' },
    { id: 'desc-best', title: 'Best', path: '/Videos/Best.mp4' },
    { id: 'desc-beautiful', title: 'Beautiful', path: '/Videos/Beautiful.mp4' },
    { id: 'desc-happy', title: 'Happy', path: '/Videos/Happy.mp4' },
    { id: 'desc-busy', title: 'Busy', path: '/Videos/Busy.mp4' },
    { id: 'desc-wrong', title: 'Wrong', path: '/Videos/Wrong.mp4' }
  ];

  // Time-related
  const time: VideoItem[] = [
    { id: 'time-day', title: 'Day', path: '/Videos/Day.mp4' },
    { id: 'time-before', title: 'Before', path: '/Videos/Before.mp4' },
    { id: 'time-after', title: 'After', path: '/Videos/After.mp4' },
    { id: 'time-again', title: 'Again', path: '/Videos/Again.mp4' }
  ];

  // People and places
  const people: VideoItem[] = [
    { id: 'people-me', title: 'Me', path: '/Videos/Me.mp4' },
    { id: 'people-home', title: 'Home', path: '/Videos/Home.mp4' },
    { id: 'people-world', title: 'World', path: '/Videos/World.mp4' }
  ];

  // Organize into categories
  return [
    { id: 'basic', name: 'Basic Greetings', videos: basic },
    { id: 'questions', name: 'Questions', videos: questions },
    { id: 'common', name: 'Common Words', videos: common },
    { id: 'actions', name: 'Actions', videos: actions },
    { id: 'descriptive', name: 'Descriptive Words', videos: descriptive },
    { id: 'time', name: 'Time-related Words', videos: time },
    { id: 'people', name: 'People & Places', videos: people },
    { id: 'numbers', name: 'Numbers', videos: numbers }
  ];
};

// Get all videos as a flat array
export const getAllVideos = (): VideoItem[] => {
  return extractCategories().flatMap(category => category.videos);
};

// Get videos organized by category
export const getVideoCategories = (): VideoCategory[] => {
  return extractCategories();
};

// Find a video by its ID
export const findVideoById = (videoId: string): VideoItem | undefined => {
  return getAllVideos().find(video => video.id === videoId);
};

// Find related videos (from the same category)
export const getRelatedVideos = (videoId: string, limit: number = 5): VideoItem[] => {
  const allCategories = extractCategories();
  
  // Find which category the video belongs to
  for (const category of allCategories) {
    const videoIndex = category.videos.findIndex(video => video.id === videoId);
    if (videoIndex >= 0) {
      // Get videos from the same category, excluding the current video
      return category.videos
        .filter(video => video.id !== videoId)
        .slice(0, limit);
    }
  }
  
  // If not found, return some random videos
  return getAllVideos()
    .filter(video => video.id !== videoId)
    .slice(0, limit);
};
