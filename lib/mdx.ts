import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Blog } from '@/types';

const blogsDirectory = path.join(process.cwd(), 'data/blogs');

/**
 * Get all blog posts with metadata (for listing pages)
 */
export function getAllBlogs(): Blog[] {
  // Ensure directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);

  const blogs = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        imageUrl: data.imageUrl,
      } as Blog;
    });

  // Sort by date descending (newest first)
  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single blog post by slug (includes content)
 */
export function getBlogBySlug(slug: string): Blog | null {
  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    imageUrl: data.imageUrl,
    content,
  };
}

/**
 * Get all blog slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
