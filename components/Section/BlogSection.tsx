import { blogs } from "@/data/blogs";
import BlogCard from "@/components/UI//BlogCard";

export default function BlogSection() {
  return (
    <section className="bg-black py-20 px-6 " id="blogs">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl md:text-4xlfont-mono mb-12 flex items-center gap-4">
          <span className="w-3 h-3 bg-[#DFFF00] rounded-full inline-block"></span>
          Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-px bg-transparent justify-items-center">
           {/* gap-px with bg-gray-800 creates those thin professional divider lines */}
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
