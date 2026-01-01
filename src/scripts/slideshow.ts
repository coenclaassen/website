let currentSlide = 0;
let isPlaying = true;
let slideshowInterval: number | null = null;

export function initSlideshow(totalSlides: number, slideDurationMs: number) {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('slideshow-prev');
  const nextBtn = document.getElementById('slideshow-next');
  const fullscreenBtn = document.getElementById('slideshow-fullscreen');
  const slideshowSection = document.querySelector('.slideshow-section');

  // Early return if no slides found
  if (slides.length === 0) return;

  function showSlide(index: number) {
    if (slides.length === 0) return;
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === safeIndex);
    });
    currentSlide = safeIndex;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  function startSlideshow() {
    if (slideshowInterval) return;
    isPlaying = true;
    slideshowInterval = window.setInterval(nextSlide, slideDurationMs);
  }

  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
    isPlaying = false;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (slideshowSection && slideshowSection instanceof HTMLElement) {
        // Stop slideshow when entering fullscreen
        stopSlideshow();
        slideshowSection.requestFullscreen().catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
          // If fullscreen fails, restart slideshow
          startSlideshow();
        });
      }
    } else {
      document.exitFullscreen();
    }
  }

  // Listen for fullscreen changes to restart slideshow when exiting
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      // Fullscreen exited - restart slideshow and scroll to top of slideshow
      startSlideshow();
      if (slideshowSection && slideshowSection instanceof HTMLElement) {
        // Scroll to align top of slideshow with top of viewport
        slideshowSection.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      if (isPlaying) {
        stopSlideshow();
        startSlideshow();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isPlaying) {
        stopSlideshow();
        startSlideshow();
      }
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Start the slideshow
  startSlideshow();
}

