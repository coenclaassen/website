export function initRotatingText(rotationDurationMs: number) {
  const textItems = document.querySelectorAll('.rotating-text-item');
  const placeholder = document.querySelector('.rotating-text-placeholder');
  
  // Early return if no text items found
  if (textItems.length === 0) return;
  
  let currentIndex = 0;

  // Store original text content to restore when not on mobile
  const originalTexts = new Map();
  const originalHTML = new Map();
  
  // Helper function to extract clean text from an element
  function extractTextContent(element: Element) {
    // Get innerHTML and process it as a string
    let html = element.innerHTML;
    // Replace <br> and <br /> tags (with any attributes) with spaces
    html = html.replace(/<br\s*[^>]*\/?>/gi, ' ');
    // Replace &nbsp; with regular spaces
    html = html.replace(/&nbsp;/g, ' ');
    // Remove all other HTML tags
    html = html.replace(/<[^>]+>/g, '');
    // Decode HTML entities (like &amp; becomes &)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
    return text;
  }
  
  // On mobile portrait, replace spaces with line breaks for one word per line
  function formatTextForMobile() {
    const isMobilePortrait = window.innerWidth <= 767 && window.matchMedia('(orientation: portrait)').matches;
    
    textItems.forEach((item, index) => {
      // Store original HTML and text on first run
      if (!originalHTML.has(index)) {
        originalHTML.set(index, item.innerHTML);
        originalTexts.set(index, extractTextContent(item));
      }
      
      if (isMobilePortrait) {
        // Get the original text content
        const text = originalTexts.get(index);
        // Normalize all whitespace to single spaces
        const normalizedText = text.replace(/\s+/g, ' ');
        // Split by space to get individual words
        const words = normalizedText.split(' ').filter(word => word.length > 0);
        // Join words with <br /> for one word per line
        item.innerHTML = words.join('<br />');
      } else {
        // Restore original HTML when not on mobile
        item.innerHTML = originalHTML.get(index);
      }
    });
    
    // Handle placeholder
    if (placeholder) {
      if (!originalHTML.has('placeholder')) {
        originalHTML.set('placeholder', placeholder.innerHTML);
        originalTexts.set('placeholder', extractTextContent(placeholder));
      }
      
      if (isMobilePortrait) {
        const text = originalTexts.get('placeholder');
        const normalizedText = text.replace(/\s+/g, ' ');
        const words = normalizedText.split(' ').filter(word => word.length > 0);
        placeholder.innerHTML = words.join('<br />');
      } else {
        placeholder.innerHTML = originalHTML.get('placeholder');
      }
    }
  }

  function rotateText() {
    // Safety check
    if (textItems.length === 0) return;
    
    // Remove active class from current item
    if (textItems[currentIndex]) {
      textItems[currentIndex].classList.remove('active');
    }
    
    // Move to next item
    currentIndex = (currentIndex + 1) % textItems.length;
    
    // Add active class to new item
    if (textItems[currentIndex]) {
      textItems[currentIndex].classList.add('active');
    }
  }

  // Format text for mobile on load and resize
  formatTextForMobile();
  window.addEventListener('resize', formatTextForMobile);
  window.addEventListener('orientationchange', () => {
    setTimeout(formatTextForMobile, 100); // Small delay to ensure orientation change is complete
  });

  // Start rotation
  setInterval(rotateText, rotationDurationMs);
}

