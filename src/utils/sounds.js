// Generate a pleasant notification sound using Web Audio API
// Plays 3 times to ensure user notices
export const playNotificationSound = () => {
  const playSingleSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for the main tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequency (A4 note = 440 Hz)
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.type = 'sine';
      
      // Set volume envelope (fade in and out)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      // Play the sound
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      // Play a second tone for a pleasant "ding" effect
      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        oscillator2.type = 'sine';
        
        gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode2.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.01);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.8);
      }, 100);
      
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  };

  // Play the sound 3 times with delays
  playSingleSound();
  setTimeout(() => playSingleSound(), 800);
  setTimeout(() => playSingleSound(), 1500);
};
