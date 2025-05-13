
// This file will import all word animations and export them together
// You'll replace this with your actual implementations

// Example word animation
export const TIME = (ref: any) => {
  ref.characters.push('TIME');
  let animations = [];
  
  // These animations would be specific to the sign for "TIME"
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

// Placeholder functions for common words
// Replace each of these with actual implementations in separate files
export const HOME = (ref: any) => { /* Similar to TIME, with HOME-specific animations */ };
export const PERSON = (ref: any) => { /* Similar to TIME, with PERSON-specific animations */ };
export const YOU = (ref: any) => { /* Similar to TIME, with YOU-specific animations */ };

// Export the word list for reference
export const wordList = ['TIME', 'HOME', 'PERSON', 'YOU'];
