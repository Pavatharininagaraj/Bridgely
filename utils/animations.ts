
// Export animation utilities for sign language rendering

// Dummy alphabets and words lists 
export const ALPHABET_LIST = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export const WORD_LIST = ['TIME', 'HOME', 'PERSON', 'YOU'];

// Default neutral pose
export const defaultPose = (ref: any) => {
  if (!ref || !ref.animations) return;
  
  ref.characters.push(' ');
  let animations = [];
  
  animations.push(["mixamorigNeck", "rotation", "x", Math.PI/12, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/3, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/1.5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "+"]);
  
  ref.animations.push(animations);
  
  if(ref.pending === false){
    ref.pending = true;
    ref.animate();
  }
};

// Simulate animation for a letter
export const animateLetter = (ref: any, letter: string) => {
  if (!ref || !ref.animations) return;
  
  try {
    // Try to dynamically import the letter animation
    import(`./animations/alphabets/${letter}`).then(module => {
      if (module && typeof module[letter] === 'function') {
        // Use named export instead of default
        module[letter](ref);
      } else {
        // Fallback to mock if import succeeds but doesn't have correct export
        console.warn(`Animation for letter ${letter} found but has incorrect format`);
        mockAnimationFunction(ref, letter);
      }
    }).catch(error => {
      // Fallback to mock if import fails
      console.warn(`Animation for letter ${letter} not found, using fallback`, error);
      mockAnimationFunction(ref, letter);
    });
  } catch (error) {
    // Use mock animation as fallback
    console.warn(`Could not load animation for letter ${letter}`, error);
    mockAnimationFunction(ref, letter);
  }
};

// Simulate animation for a word
export const animateWord = (ref: any, word: string) => {
  if (!ref || !ref.animations) return;
  
  try {
    // Try to dynamically import the word animation
    import(`./animations/words/${word}`).then(module => {
      if (module && typeof module[word] === 'function') {
        // Use named export instead of default
        module[word](ref);
      } else {
        // Fallback to mock if import succeeds but doesn't have correct export
        console.warn(`Animation for word ${word} found but has incorrect format`);
        mockAnimationFunction(ref, word);
      }
    }).catch(error => {
      // Fallback to mock if import fails
      console.warn(`Animation for word ${word} not found, using fallback`, error);
      mockAnimationFunction(ref, word);
    });
  } catch (error) {
    // Use mock animation as fallback
    console.warn(`Could not load animation for word ${word}`, error);
    mockAnimationFunction(ref, word);
  }
};

// Process text input and animate it
export const processTextInput = (ref: any, text: string, setText?: (text: string) => void) => {
  if (!ref || !ref.animations) return;
  
  const strWords = text.trim().toUpperCase().split(' ');
  
  if (setText) setText('');
  
  for (let word of strWords) {
    if (WORD_LIST.includes(word)) {
      // It's a known word, animate it directly
      if (setText) ref.animations.push(['add-text', word + ' ']);
      animateWord(ref, word);
    } else {
      // Spell it out letter by letter
      for (const [index, letter] of word.split('').entries()) {
        if (index === word.length - 1) {
          if (setText) ref.animations.push(['add-text', letter + ' ']);
        } else {
          if (setText) ref.animations.push(['add-text', letter]);
        }
        animateLetter(ref, letter);
      }
    }
  }
};

// Placeholder for animation definitions until real ones are uploaded
export const mockAnimationFunction = (ref: any, type: string) => {
  ref.characters.push(type);
  let animations = [];
  
  // Sample animation sequence - these would be different for each sign
  animations.push(["mixamorigNeck", "rotation", "x", Math.PI/12, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/3, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/1.5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "+"]);
  
  ref.animations.push(animations);
  
  if(ref.pending === false){
    ref.pending = true;
    ref.animate();
  }
};
