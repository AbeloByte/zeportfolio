import { getAllBlogs } from "@/lib/mdx";
import BlogCard from "@/components/UI/BlogCard";
import { Stagger, StaggerItem } from "@/components/motion";
import SectionTitle from "@/components/shared/SectionTitle";

export default function BlogSection() {
  const blogs = getAllBlogs();

  return (
    <section className="bg-bgColor px-6 py-24 md:py-32" id="blogs">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          index="04"
          eyebrow="Writing"
          title="Blogs"
          className="mb-14 md:mb-16"
        />

        <Stagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-px bg-transparent justify-items-center">
           {/* gap-px with bg-gray-800 creates those thin professional divider lines */}
          {blogs.map((blog) => (
            <StaggerItem key={blog.slug} className="h-full">
              <BlogCard blog={blog} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
