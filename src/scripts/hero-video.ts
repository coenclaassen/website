export function initHeroVideo() {
  const video = document.querySelector('.hero-video') as HTMLVideoElement;
  if (!video) return;

  let hasTriedPlay = false;
  let userInteractionHandler: (() => void) | null = null;

  function attemptPlay() {
    if (hasTriedPlay) return;
    hasTriedPlay = true;

    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay succeeded
          if (userInteractionHandler) {
            document.removeEventListener('click', userInteractionHandler);
            document.removeEventListener('touchstart', userInteractionHandler);
            userInteractionHandler = null;
          }
        })
        .catch((error) => {
          // Autoplay was prevented - set up retry on user interaction
          console.log('Video autoplay blocked, will retry on user interaction');
          
          userInteractionHandler = () => {
            video.play().catch((err) => {
              console.error('Error playing video after user interaction:', err);
            });
            // Remove listeners after first interaction
            if (userInteractionHandler) {
              document.removeEventListener('click', userInteractionHandler);
              document.removeEventListener('touchstart', userInteractionHandler);
              userInteractionHandler = null;
            }
          };
          
          document.addEventListener('click', userInteractionHandler, { once: true });
          document.addEventListener('touchstart', userInteractionHandler, { once: true });
        });
    }
  }

  // Try to play when metadata is loaded
  if (video.readyState >= 1) {
    // Metadata already loaded
    attemptPlay();
  } else {
    // Wait for metadata to load
    video.addEventListener('loadedmetadata', attemptPlay, { once: true });
  }

  // Also try on canplay event as a fallback
  video.addEventListener('canplay', () => {
    if (!hasTriedPlay) {
      attemptPlay();
    }
  }, { once: true });

  // Handle video errors
  video.addEventListener('error', (e) => {
    console.error('Video loading error:', e);
  });
}

