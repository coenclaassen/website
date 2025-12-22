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

export function parseMarkdown(content: string): Array<{ type: 'h1' | 'h5' | 'p', text: string }> {
  if (!content) return [];
  
  const lines = content.split('\n');
  const result: Array<{ type: 'h1' | 'h5' | 'p', text: string }> = [];
  let currentParagraph = '';
  
  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      result.push({ type: 'p', text: currentParagraph.trim() });
      currentParagraph = '';
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (/^#####\s/.test(trimmed)) {
      flushParagraph();
      result.push({ type: 'h5', text: trimmed.replace(/^#####\s*/, '') });
    } else if (/^#+\s/.test(trimmed)) {
      flushParagraph();
      result.push({ type: 'h1', text: trimmed.replace(/^#+\s*/, '') });
    } else if (/^[-*]\s/.test(trimmed)) {
      flushParagraph();
      result.push({ type: 'p', text: trimmed.replace(/^[-*]\s*/, '') });
    } else if (trimmed) {
      currentParagraph = currentParagraph ? `${currentParagraph} ${trimmed}` : trimmed;
    } else {
      flushParagraph();
    }
  }
  
  flushParagraph();
  return result;
}


