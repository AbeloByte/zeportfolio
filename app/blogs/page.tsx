import { getAllBlogs } from '@/lib/mdx';
import BlogCard from '@/components/UI/BlogCard';
import Button from '@/components/UI/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Blogs | Portfolio',
  description: 'Read my thoughts on web development, UI design, and software engineering.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <section className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-white text-3xl md:text-5xl font-mono mb-4 flex items-center gap-4">
          <span className="w-3 h-3 bg-[#DFFF00] rounded-full inline-block"></span>
          All Blogs
        </h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Thoughts, learnings, and reflections from my journey as a developer.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>

      <div className='flex justify-center mt-12'>
        <Link href="/">
        <Button label="Go Back to Home" size="lg"/>
        </Link>
      </div>
    </section>
  );
}
