export function initCoffeeGrid() {
  const grid = document.getElementById('coffee-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  if (!grid || !loadMoreBtn) return;
  
  const allCards = Array.from(grid.querySelectorAll('.coffee-card-wrapper'));
  const getCount = () => window.innerWidth >= 768 ? 6 : 3;
  
  let visibleCount = getCount();
  
  function updateVisibility() {
    allCards.forEach((card, index) => {
      card.classList.toggle('visible', index < visibleCount);
    });
    loadMoreBtn.style.display = visibleCount >= allCards.length ? 'none' : '';
  }
  
  updateVisibility();
  
  loadMoreBtn.addEventListener('click', () => {
    visibleCount = Math.min(visibleCount + getCount(), allCards.length);
    updateVisibility();
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCoffeeGrid);
} else {
  initCoffeeGrid();
}

