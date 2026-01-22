import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogBySlug } from '@/lib/mdx';
import { parseContentToSections, estimateReadTime } from '@/lib/mdx-parser';
import { ContentSection } from '@/components/blog';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.description,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const contentSections = parseContentToSections(blog.content || '');

  return (
    <article className="bg-black min-h-screen text-white">
      {/* Hero Header */}
      <div className="relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />

        {/* Featured Image as background */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={blog.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-16">
          {/* Back Link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#DFFF00] transition-colors mb-6 sm:mb-8 group text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blogs
          </Link>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="bg-[#DFFF00] text-black px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-mono font-bold">
              {blog.date}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm font-mono">
              {estimateReadTime(blog.content || '')} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono leading-tight mb-4 sm:mb-6">
            {blog.title}
          </h1>

          {/* Description */}
          <div className="border-l-4 border-[#DFFF00] pl-6 py-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              {blog.description}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-[400px] w-full border border-gray-700 -mt-2 sm:-mt-4 mb-8 sm:mb-12 md:mb-16">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        {contentSections.map((section, index) => (
          <ContentSection key={index} section={section} />
        ))}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-gray-500 text-sm">
            Thanks for reading!
          </p>
          <Link
            href="/blogs"
            className="bg-white text-black px-6 py-3 font-bold border-r-4 border-b-4 border-[#DFFF00] hover:translate-x-1 hover:translate-y-1 transition-all inline-block"
          >
            ← Read More Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
