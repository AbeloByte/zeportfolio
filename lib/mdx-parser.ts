/**
 * MDX Content Parser
 *
 * Utilities for parsing MDX content into structured sections
 * and formatting inline markdown elements.
 */

// Content block types
export interface ContentBlock {
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'list' | 'code' | 'blockquote';
  content: string;
  items?: string[];
}

export interface Section {
  heading?: string;
  blocks: ContentBlock[];
}

/**
 * Parse MDX content into structured sections
 * Sections are divided by H1 and H2 headings
 */
export function parseContentToSections(content: string): Section[] {
  const lines = content.split('\n');
  const sections: Section[] = [];
  let currentSection: Section = { blocks: [] };
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        currentSection.blocks.push({ type: 'code', content: codeContent.trim() });
        codeContent = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Flush any pending list
    if (listItems.length > 0 && !line.match(/^\s*-\s+/)) {
      currentSection.blocks.push({ type: 'list', content: '', items: listItems });
      listItems = [];
    }

    // Skip empty lines
    if (!line.trim()) continue;

    // H1 - Start a new major section
    if (line.startsWith('# ')) {
      if (currentSection.blocks.length > 0 || currentSection.heading) {
        sections.push(currentSection);
      }
      currentSection = { heading: line.replace(/^#\s+/, ''), blocks: [] };
      continue;
    }

    // H2 - Start a new section
    if (line.startsWith('## ')) {
      if (currentSection.blocks.length > 0 || currentSection.heading) {
        sections.push(currentSection);
      }
      currentSection = { heading: line.replace(/^##\s+/, ''), blocks: [] };
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      currentSection.blocks.push({
        type: 'h3',
        content: line.replace(/^###\s+/, ''),
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      currentSection.blocks.push({
        type: 'blockquote',
        content: line.replace(/^>\s+/, ''),
      });
      continue;
    }

    // List item
    if (line.match(/^\s*-\s+/)) {
      listItems.push(line.replace(/^\s*-\s+/, ''));
      continue;
    }

    // Regular paragraph
    currentSection.blocks.push({ type: 'paragraph', content: line });
  }

  // Flush remaining list
  if (listItems.length > 0) {
    currentSection.blocks.push({ type: 'list', content: '', items: listItems });
  }

  // Push final section
  if (currentSection.blocks.length > 0 || currentSection.heading) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Format inline content (bold, italic, code, links)
 * Converts markdown syntax to styled HTML
 */
export function formatInlineContent(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-[#DFFF00] text-sm font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#DFFF00] hover:underline">$1</a>');
}

/**
 * Estimate reading time based on word count
 * Assumes 200 words per minute
 */
export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
