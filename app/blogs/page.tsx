import { getAllBlogs } from '@/lib/mdx';
import BlogCard from '@/components/UI/BlogCard';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { Stagger, StaggerItem } from '@/components/motion';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata = {
  title: 'Blogs | Portfolio',
  description: 'Read my thoughts on web development, UI design, and software engineering.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bgColor px-6 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <SectionTitle
          index="—"
          eyebrow="Writing"
          title="All Blogs"
          subtitle="Thoughts, learnings, and reflections from my journey as a developer."
          className="mb-14"
        />

        {/* Blog Grid */}
        <Stagger stagger={0.1} delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <StaggerItem key={blog.slug} className="h-full">
              <BlogCard blog={blog} />
            </StaggerItem>
          ))}
        </Stagger>

        {blogs.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>

      <div className='relative z-10 flex justify-center mt-12'>
        <Link href="/">
        <Button label="Go Back to Home" size="lg"/>
        </Link>
      </div>
    </section>
  );
}
