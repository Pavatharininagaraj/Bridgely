import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hand, Video, BookOpen, ChevronRight, Award, Shapes, Globe, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/20 pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Hand className="w-4 h-4 mr-2" />
                <span>🌍 Breaking communication barriers</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Learn Sign Language
                <span className="block text-primary mt-2">Intuitively & Effectively</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Bridgely helps you learn sign language through interactive 3D models and 
                real-world video tutorials at your own pace. Start your journey towards 
                better communication today.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link to="/video-learning">
                  <motion.button 
                    className="btn-primary flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Start Video Learning
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </Link>
                <Link to="/learn">
                  <motion.button 
                    className="btn-outline flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    3D Interactive Learning
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg">
                {/* Abstract shapes for visual interest */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">Why Choose Bridgely?</h2>
            <p className="section-subheading">
              Our platform combines cutting-edge technology with effective learning methods to make sign language accessible to everyone.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shapes className="w-6 h-6 text-primary" />,
                title: "Interactive 3D Models",
                description: "Learn sign language with immersive 3D animations that show precise hand movements from any angle."
              },
              {
                icon: <Video className="w-6 h-6 text-primary" />,
                title: "Video Tutorials",
                description: "Watch high-quality videos featuring experienced signers demonstrating signs and phrases in real-world contexts."
              },
              {
                icon: <Globe className="w-6 h-6 text-primary" />,
                title: "Comprehensive Library",
                description: "Access a growing library of signs covering alphabets, common words, phrases, and everyday conversations."
              },
              {
                icon: <BookOpen className="w-6 h-6 text-primary" />,
                title: "Structured Learning",
                description: "Follow a carefully designed curriculum that builds your skills progressively from basics to advanced concepts."
              },
              {
                icon: <Award className="w-6 h-6 text-primary" />,
                title: "Progress Tracking",
                description: "Keep track of your learning journey with our intuitive progress system that celebrates your achievements."
              },
              {
                icon: <Heart className="w-6 h-6 text-primary" />,
                title: "Inclusive Design",
                description: "Designed with accessibility in mind to ensure everyone can learn sign language effectively."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/90 to-primary overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Your Sign Language Journey Today
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Breaking communication barriers begins with a single step. 
            Choose your preferred learning method and embark on your 
            journey to fluency in sign language.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/video-learning">
              <motion.button 
                className="px-8 py-3 bg-white text-primary font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start with Videos
              </motion.button>
            </Link>
            <Link to="/learn">
              <motion.button 
                className="px-8 py-3 bg-transparent text-white border-2 border-white/50 font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try 3D Learning
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials/Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-heading">Making an Impact</h2>
            <p className="section-subheading">
              Bridgely is helping people around the world connect through sign language
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Signs & Phrases" },
              { number: "24/7", label: "Learning Access" },
              { number: "2", label: "Learning Methods" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <Hand className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Bridgely</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Bridgely. Breaking barriers through sign language.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
