export const CURRENT_YEAR = new Date().getFullYear();

export const SITE_URL = 'https://www.coenclaassen.com';

// Slideshow configuration
export const TOTAL_SLIDES = 18;
// Select which slides to show (1-indexed: 1 = slide01.png, 2 = slide02.png, etc.)
// To exclude slides, remove their numbers from this array
export const SHOWN_SLIDES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export const ROTATION_DURATION_MS = 4000;
export const SLIDE_DURATION_MS = 5000;

export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/coffee', label: 'Curiosity Coffee' },
  { href: '/CoenClaassen.pdf', label: 'Resume', external: false },
  { href: 'mailto:coenclaassen@gmail.com', label: 'Contact' },
] as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/coenclaassen';
export const EMAIL = 'coenclaassen@gmail.com';

