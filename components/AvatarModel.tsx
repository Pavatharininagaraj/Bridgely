
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { toast } from 'sonner';

interface AvatarModelProps {
  modelPath: string;
  containerRef: React.RefObject<HTMLDivElement>;
  animationSpeed: number;
  pauseTime: number;
  onLoad?: (ref: any) => void;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ 
  modelPath, 
  containerRef, 
  animationSpeed, 
  pauseTime, 
  onLoad 
}) => {
  const sceneRef = useRef<any>({
    flag: false,
    pending: false,
    animations: [],
    characters: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { current: ref } = sceneRef;
    setLoading(true);
    setError(null);
    
    // Set up scene
    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf8fafc);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ref.scene.add(ambientLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(0, 5, 5);
    spotLight.castShadow = true;
    ref.scene.add(spotLight);
    
    // Set up camera
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    ref.camera = new THREE.PerspectiveCamera(
      30,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    
    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;
    
    // Set up renderer
    ref.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    
    ref.renderer.setSize(containerWidth, containerHeight);
    ref.renderer.shadowMap.enabled = true;
    ref.renderer.outputEncoding = THREE.sRGBEncoding;
    ref.renderer.physicallyCorrectLights = true;
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(ref.renderer.domElement);
    
    // Animation function
    ref.animate = () => {
      if (ref.animations.length === 0) {
        ref.pending = false;
        return;
      }
      
      requestAnimationFrame(ref.animate);
      
      if (ref.animations[0].length) {
        if (!ref.flag) {
          if (ref.animations[0][0] === 'add-text') {
            // This will be handled by the parent component
            ref.animations.shift();
          } else {
            for (let i = 0; i < ref.animations[0].length;) {
              let [boneName, action, axis, limit, sign] = ref.animations[0][i];
              
              if (sign === "+" && ref.avatar?.getObjectByName(boneName)?.[action]?.[axis] < limit) {
                ref.avatar.getObjectByName(boneName)[action][axis] += animationSpeed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(
                  ref.avatar.getObjectByName(boneName)[action][axis],
                  limit
                );
                i++;
              } else if (sign === "-" && ref.avatar?.getObjectByName(boneName)?.[action]?.[axis] > limit) {
                ref.avatar.getObjectByName(boneName)[action][axis] -= animationSpeed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(
                  ref.avatar.getObjectByName(boneName)[action][axis],
                  limit
                );
                i++;
              } else {
                ref.animations[0].splice(i, 1);
              }
            }
          }
        }
      } else {
        ref.flag = true;
        setTimeout(() => {
          ref.flag = false;
        }, pauseTime);
        ref.animations.shift();
      }
      
      ref.renderer.render(ref.scene, ref.camera);
    };
    
    // Define handleModelError function before using it
    const handleModelError = (errorMessage: string) => {
      console.error('Error with 3D model:', errorMessage);
      setError(errorMessage);
      setLoading(false);
      
      // Clear any loading indicators
      if (containerRef.current) {
        const loadingDiv = containerRef.current.querySelector('.absolute');
        if (loadingDiv && loadingDiv.parentNode) {
          loadingDiv.parentNode.removeChild(loadingDiv);
        }
        
        // Show error in container
        const errorDiv = document.createElement('div');
        errorDiv.className = 'absolute inset-0 flex items-center justify-center bg-white/80';
        errorDiv.innerHTML = `
          <div class="text-center p-4 max-w-md">
            <div class="text-red-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-red-800 mb-2">Failed to load 3D model</h3>
            <p class="text-sm text-gray-600 mb-4">Please make sure the model file is uploaded to the correct location: ${modelPath}</p>
            <p class="text-xs text-gray-500">Error: ${errorMessage}</p>
          </div>
        `;
        containerRef.current.appendChild(errorDiv);
        
        toast.error("Failed to load 3D model", {
          description: "Please make sure you've uploaded the model files to the correct location."
        });
      }
    };
    
    // Load model with error handling
    try {
      // First check if the file exists
      fetch(modelPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Model file not found: ${modelPath}`);
          }
          return true;
        })
        .then(() => {
          const loader = new GLTFLoader();
          
          // Show loading message
          const loadingDiv = document.createElement('div');
          loadingDiv.className = 'absolute inset-0 flex items-center justify-center bg-white/80';
          loadingDiv.innerHTML = `
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-2"></div>
              <p class="text-gray-600">Loading avatar model...</p>
            </div>
          `;
          if (containerRef.current) {
            containerRef.current.appendChild(loadingDiv);
          }
          
          loader.load(
            modelPath,
            (gltf) => {
              // Remove loading display
              if (loadingDiv && loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
              }
              
              gltf.scene.traverse((child) => {
                if (child.type === 'SkinnedMesh') {
                  child.frustumCulled = false;
                }
              });
              
              ref.avatar = gltf.scene;
              ref.scene.add(ref.avatar);
              
              // Initialize default pose
              const defaultPose = () => {
                ref.characters.push(' ');
                let animations = [];
                
                animations.push(["mixamorigNeck", "rotation", "x", Math.PI/12, "+"]);
                animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/3, "-"]);
                animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/1.5, "-"]);
                animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
                animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "+"]);
                ref.animations.push(animations);
                
                if (ref.pending === false) {
                  ref.pending = true;
                  ref.animate();
                }
              };
              
              defaultPose();
              setLoading(false);
              
              // Call onLoad callback if provided
              if (onLoad) {
                onLoad(ref);
              }
              
              // Render initial frame
              ref.renderer.render(ref.scene, ref.camera);
            },
            (xhr) => {
              const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
              console.log(`${percentComplete}% loaded`);
            },
            (error) => {
              handleModelError(error.message || 'Unknown error loading model');
            }
          );
        })
        .catch(error => {
          handleModelError(error.message);
        });
    } catch (err: any) {
      handleModelError(err.message || 'Unknown error initializing 3D scene');
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      ref.camera.aspect = newWidth / newHeight;
      ref.camera.updateProjectionMatrix();
      ref.renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      
      if (ref.renderer) {
        ref.renderer.dispose();
      }
      
      if (ref.scene) {
        ref.scene.clear();
      }
    };
  }, [modelPath, containerRef, animationSpeed, pauseTime, onLoad]);
  
  return null;
};

export default AvatarModel;

