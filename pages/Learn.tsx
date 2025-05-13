
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarModel from '@/components/AvatarModel';
import { ALPHABET_LIST, WORD_LIST, animateLetter, animateWord } from '@/utils/animations';
import { toast } from 'sonner';
import { Hand, Settings, PlayCircle, Tv, Info } from 'lucide-react';

const AVATAR_MODELS = [
  {
    id: 'ybot',
    name: 'Avatar',
    path: '/Models/ybot/ybot.glb',
    thumbnail: '/Models/ybot/ybot.png'
  }

  
];

const Learn = () => {
  const [selectedModel, setSelectedModel] = useState(AVATAR_MODELS[0]);
  const [animationSpeed, setAnimationSpeed] = useState(0.1);
  const [pauseTime, setPauseTime] = useState(800);
  const [modelRef, setModelRef] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('alphabets');
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleModelLoad = (ref: any) => {
    setModelRef(ref);
    toast.success("Avatar model loaded successfully!");
  };
  
  const handleLetterClick = (letter: string) => {
    if (modelRef && modelRef.animations.length === 0) {
      animateLetter(modelRef, letter);
      toast.info(`Showing sign for: ${letter}`, {
        icon: <Hand className="w-4 h-4" />
      });
    } else if (!modelRef) {
      toast.error("Avatar model not loaded yet");
    } else {
      toast.warning("Animation in progress, please wait");
    }
  };
  
  const handleWordClick = (word: string) => {
    if (modelRef && modelRef.animations.length === 0) {
      animateWord(modelRef, word);
      toast.info(`Showing sign for: ${word}`, {
        icon: <Hand className="w-4 h-4" />
      });
    } else if (!modelRef) {
      toast.error("Avatar model not loaded yet");
    } else {
      toast.warning("Animation in progress, please wait");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-2">
          <Hand className="w-6 h-6 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Interactive Sign Language</h1>
        </div>
        <p className="text-gray-600">
          Learn sign language through interactive 3D animations. Click on any letter or word to see the corresponding sign.
        </p>
      </motion.div>
    
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 rounded-none bg-gray-50 p-0 h-12">
                <TabsTrigger 
                  value="alphabets" 
                  className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                >
                  Alphabets
                </TabsTrigger>
                <TabsTrigger 
                  value="words"
                  className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                >
                  Words
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="alphabets" className="m-0 p-4">
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
                  {ALPHABET_LIST.map((letter) => (
                    <motion.button
                      key={letter}
                      className="sign-button p-3 rounded-lg border border-gray-200 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
                      onClick={() => handleLetterClick(letter)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {letter}
                    </motion.button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="words" className="m-0 p-4">
                <div className="grid grid-cols-2 gap-2">
                  {WORD_LIST.map((word) => (
                    <motion.button
                      key={word}
                      className="sign-button p-3 rounded-lg border border-gray-200 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
                      onClick={() => handleWordClick(word)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {word}
                    </motion.button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Animation Speed</span>
                  <span className="text-primary">{animationSpeed.toFixed(2)}</span>
                </label>
                <Slider
                  value={[animationSpeed]}
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                />
                <p className="text-xs text-gray-500">Slower ← → Faster</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Pause Time</span>
                  <span className="text-primary">{pauseTime}ms</span>
                </label>
                <Slider
                  value={[pauseTime]}
                  min={0}
                  max={2000}
                  step={100}
                  onValueChange={(value) => setPauseTime(value[0])}
                />
                <p className="text-xs text-gray-500">Shorter ← → Longer</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center mb-4">
              <PlayCircle className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Animation View</h2>
            </div>
            <div className="canvas-container h-[500px]" ref={containerRef}></div>
            <AvatarModel
              modelPath={selectedModel.path}
              containerRef={containerRef}
              animationSpeed={animationSpeed}
              pauseTime={pauseTime}
              onLoad={handleModelLoad}
            />
            <div className="mt-4 flex justify-center">
              <div className="text-sm text-gray-500 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                <span>Click on a letter or word to see the animation</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
              <Tv className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Learning Tips</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium text-primary mb-1">Practice Regularly</h3>
                <p className="text-sm text-gray-600">Spend a few minutes each day practicing signs to build muscle memory.</p>
              </div>
              
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium text-primary mb-1">Watch Your Form</h3>
                <p className="text-sm text-gray-600">Pay attention to hand shape, position, and movement direction.</p>
              </div>
              
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium text-primary mb-1">Use Video Tutorials</h3>
                <p className="text-sm text-gray-600">Complement 3D animations with our video tutorials for real-world signing.</p>
              </div>
              
              <div className="mt-4">
                <Button 
                  className="w-full rounded-lg"
                  onClick={() => window.location.href = '/video-learning'}
                >
                  Go to Video Tutorials
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
              <Hand className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Avatar</h2>
            </div>
            <div className="flex justify-center">
              <motion.div
                key={AVATAR_MODELS[0].id}
                className="avatar-selector p-3 rounded-lg cursor-pointer border ring-2 ring-primary/30 border-primary/20 max-w-[150px] bg-primary/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={AVATAR_MODELS[0].thumbnail} 
                  alt={AVATAR_MODELS[0].name} 
                  className="w-full h-auto aspect-square object-cover rounded-lg"
                />
                <p className="text-center mt-2 text-sm font-medium">3D Avatar</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
