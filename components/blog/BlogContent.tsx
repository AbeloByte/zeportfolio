import { Section, formatInlineContent } from '@/lib/mdx-parser';

interface ContentSectionProps {
  section: Section;
}

/**
 * ContentSection Component
 *
 * Renders a section of blog content with an optional heading
 * and multiple content blocks.
 */
export function ContentSection({ section }: ContentSectionProps) {
  return (
    <section className="mb-8 sm:mb-12">
      {section.heading && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-[#DFFF00] mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#DFFF00] rounded-full flex-shrink-0 mt-2 sm:mt-2.5" />
          <span className="leading-tight">{section.heading}</span>
        </h2>
      )}
      <div className="space-y-3 sm:space-y-4">
        {section.blocks.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

interface ContentBlockProps {
  block: {
    type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'list' | 'code' | 'blockquote';
    content: string;
    items?: string[];
  };
}

/**
 * ContentBlock Component
 *
 * Renders individual content blocks (headings, paragraphs, lists, etc.)
 * with appropriate styling.
 */
export function ContentBlock({ block }: ContentBlockProps) {
  switch (block.type) {
    case 'h1':
      return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white mt-6 sm:mt-8 mb-3 sm:mb-4">
          {block.content}
        </h1>
      );
    case 'h2':
      return (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-[#DFFF00] mt-8 sm:mt-10 mb-3 sm:mb-4 flex items-start gap-2 sm:gap-3">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#DFFF00] rounded-full flex-shrink-0 mt-2 sm:mt-2.5" />
          <span className="leading-tight">{block.content}</span>
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-6 sm:mt-8 mb-2 sm:mb-3 pl-3 sm:pl-5 border-l-2 border-[#DFFF00]">
          {block.content}
        </h3>
      );
    case 'paragraph':
      return (
        <p
          className="text-gray-300 leading-relaxed text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: formatInlineContent(block.content) }}
        />
      );
    case 'list':
      return (
        <ul className="space-y-2 sm:space-y-3 pl-0">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-300">
              <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
              <span
                className="leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: formatInlineContent(item) }}
              />
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden my-4 sm:my-6 -mx-2 sm:mx-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500/60" />
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-500/60" />
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500/60" />
          </div>
          <pre className="p-3 sm:p-4 overflow-x-auto">
            <code className="text-xs sm:text-sm text-gray-300 font-mono">{block.content}</code>
          </pre>
        </div>
      );
    case 'blockquote':
      return (
        <blockquote className="border-l-2 sm:border-l-4 border-[#DFFF00] pl-4 sm:pl-6 py-2 my-4 sm:my-6 bg-gray-900/50">
          <p className="text-gray-300 italic text-base sm:text-lg">{block.content}</p>
        </blockquote>
      );
    default:
      return null;
  }
}
