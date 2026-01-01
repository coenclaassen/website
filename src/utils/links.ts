import type { NAVIGATION_LINKS } from './constants';
import { getUrl } from './url';

type NavigationLink = typeof NAVIGATION_LINKS[number];

export function processNavigationLink(link: NavigationLink) {
  let href = link.href;
  if (!link.external && !href.startsWith('mailto:') && !href.startsWith('http')) {
    href = getUrl(href === '/' ? '' : href.slice(1));
  }
  
  return {
    href,
    target: link.external ? '_blank' as const : undefined,
    rel: link.external ? 'noopener noreferrer' as const : undefined,
    label: link.label,
  };
}

