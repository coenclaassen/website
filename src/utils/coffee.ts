import type { CollectionEntry } from "astro:content";

export function sortEntries(entries: CollectionEntry<"coffee">[], ascending = false) {
  return [...entries].sort((a, b) => 
    ascending ? a.data.id - b.data.id : b.data.id - a.data.id
  );
}

export function getPrevNextEntries(
  entries: CollectionEntry<"coffee">[],
  currentId: number
) {
  const sorted = sortEntries(entries, true);
  const currentIndex = sorted.findIndex((e) => e.data.id === currentId);
  
  return {
    prevEntry: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    nextEntry: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  };
}

export function parseMarkdown(content: string): Array<{ type: 'h1' | 'h5' | 'p' | 'ul', text?: string, items?: string[] }> {
  if (!content) return [];
  
  const lines = content.split('\n');
  const result: Array<{ type: 'h1' | 'h5' | 'p' | 'ul', text?: string, items?: string[] }> = [];
  let currentParagraph = '';
  let currentList: string[] = [];
  
  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      result.push({ type: 'p', text: currentParagraph.trim() });
      currentParagraph = '';
    }
  };
  
  const flushList = () => {
    if (currentList.length > 0) {
      result.push({ type: 'ul', items: [...currentList] });
      currentList = [];
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (/^#####\s/.test(trimmed)) {
      flushParagraph();
      flushList();
      result.push({ type: 'h5', text: trimmed.replace(/^#####\s*/, '') });
    } else if (/^#+\s/.test(trimmed)) {
      flushParagraph();
      flushList();
      result.push({ type: 'h1', text: trimmed.replace(/^#+\s*/, '') });
    } else if (/^[-*]\s/.test(trimmed)) {
      flushParagraph();
      // Extract bullet text (remove the bullet marker)
      const bulletText = trimmed.replace(/^[-*]\s*/, '').trim();
      if (bulletText) {
        currentList.push(bulletText);
      }
    } else if (trimmed) {
      flushList();
      currentParagraph = currentParagraph ? `${currentParagraph} ${trimmed}` : trimmed;
    } else {
      flushParagraph();
      flushList();
    }
  }
  
  flushParagraph();
  flushList();
  return result;
}


