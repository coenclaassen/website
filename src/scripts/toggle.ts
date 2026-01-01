export function initToggles() {
  const toggleHeaders = document.querySelectorAll('.toggle-header');
  
  toggleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      if (!targetId) return;
      
      const content = document.getElementById(targetId);
      const icon = this.querySelector('.toggle-icon');
      
      if (!content) return;
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        icon?.classList.add('expanded');
      } else {
        content.style.display = 'none';
        icon?.classList.remove('expanded');
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initToggles);
} else {
  initToggles();
}

