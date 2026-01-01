import { initRotatingText } from './rotating-text';
import { initSlideshow } from './slideshow';
import { initHeroVideo } from './hero-video';

// These values should be passed from the page via data attributes or global variables
declare global {
  interface Window {
    ROTATION_DURATION_MS?: number;
    TOTAL_SLIDES?: number;
    SLIDE_DURATION_MS?: number;
  }
}

function initHomepage() {
  const rotationDuration = window.ROTATION_DURATION_MS ?? 4000;
  const totalSlides = window.TOTAL_SLIDES ?? 0;
  const slideDuration = window.SLIDE_DURATION_MS ?? 5000;

  // Initialize rotating text
  initRotatingText(rotationDuration);

  // Initialize slideshow
  if (totalSlides > 0) {
    initSlideshow(totalSlides, slideDuration);
  }

  // Initialize hero video
  initHeroVideo();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomepage);
} else {
  initHomepage();
}

