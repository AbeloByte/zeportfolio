# MDX Blog System - Developer Guide

A comprehensive guide to understanding and extending the MDX-based blog system in your Next.js portfolio.

---

## Table of Contents

1. [What is MDX?](#what-is-mdx)
2. [How It Works](#how-it-works)
3. [File Structure](#file-structure)
4. [Core Concepts](#core-concepts)
5. [Adding New Blog Posts](#adding-new-blog-posts)
6. [Customizing the System](#customizing-the-system)
7. [Advanced Features](#advanced-features)

---

## What is MDX?

**MDX** = Markdown + JSX

MDX allows you to write content in Markdown while embedding React components. It's perfect for blogs because:

- Write content naturally in Markdown
- Use frontmatter for metadata (title, date, etc.)
- Embed interactive React components when needed
- Static generation = fast page loads

```mdx
---
title: "My Blog Post"
date: "22 Jan 2026"
---

# Hello World

This is **Markdown** content.

<MyCustomComponent />  <!-- You can embed React components! -->
```

---

## How It Works

### The Flow

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  data/blogs/    │     │  lib/mdx.ts  │     │  app/blogs/     │
│  *.mdx files    │ ──▶ │  (utilities) │ ──▶ │  pages          │
└─────────────────┘     └──────────────┘     └─────────────────┘
     Content            Read & Parse         Display
```

1. **MDX files** store your blog content with frontmatter metadata
2. **lib/mdx.ts** reads files, parses frontmatter using `gray-matter`
3. **Blog pages** call utility functions to get data and render

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `@next/mdx` | Next.js MDX integration |
| `@mdx-js/loader` | Webpack loader for MDX files |
| `gray-matter` | Parses YAML frontmatter from files |

---

## File Structure

```
zeportfolio/
├── data/
│   └── blogs/                    # Your blog posts live here
│       ├── ui-details.mdx
│       ├── responsive-ui.mdx
│       └── real-projects.mdx
│
├── lib/
│   └── mdx.ts                    # Utility functions
│
├── app/
│   └── blogs/
│       ├── page.tsx              # /blogs listing page
│       └── [slug]/
│           └── page.tsx          # /blogs/:slug detail page
│
├── types/
│   └── index.ts                  # Blog type definition
│
└── next.config.ts                # MDX configuration
```

---

## Core Concepts

### 1. Frontmatter

Frontmatter is YAML metadata at the top of your MDX file:

```mdx
---
title: "Your Blog Title"
description: "Short description for SEO and cards"
date: "22 Jan 2026"
imageUrl: "/Blogs/your-image.svg"
---

Your content starts here...
```

**Parsed by `gray-matter`:**

```typescript
import matter from 'gray-matter';

const fileContents = fs.readFileSync('my-post.mdx', 'utf8');
const { data, content } = matter(fileContents);

// data = { title: "...", description: "...", date: "...", imageUrl: "..." }
// content = "Your content starts here..."
```

### 2. The Blog Type

```typescript
// types/index.ts
export interface Blog {
  title: string;       // From frontmatter
  description: string; // From frontmatter
  date: string;        // From frontmatter
  imageUrl: string;    // From frontmatter
  slug: string;        // Derived from filename
  content?: string;    // MDX content (optional, only for detail pages)
}
```

### 3. Utility Functions (lib/mdx.ts)

```typescript
// Get all blogs for listing pages (no content, just metadata)
getAllBlogs(): Blog[]

// Get a single blog with full content
getBlogBySlug(slug: string): Blog | null

// Get all slugs for static generation
getAllBlogSlugs(): string[]
```

### 4. Static Generation

Next.js pre-renders pages at build time using `generateStaticParams`:

```typescript
// app/blogs/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

This generates static HTML for each blog post at build time:
- `/blogs/ui-details` → static HTML
- `/blogs/responsive-ui` → static HTML
- `/blogs/real-projects` → static HTML

---

## Adding New Blog Posts

### Step 1: Create the MDX File

Create `data/blogs/your-new-post.mdx`:

```mdx
---
title: "Your Amazing Title"
description: "A compelling description"
date: "22 Jan 2026"
imageUrl: "/Blogs/your-image.svg"
---

# Your Heading

Write your content using Markdown syntax.

## Subheading

- Bullet points work
- **Bold** and *italic* too
- `inline code` as well

### Code Blocks

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`
```

### Step 2: Add an Image (Optional)

Place your image in `public/Blogs/your-image.svg` (or .png, .jpg).

### Step 3: Build

```bash
pnpm build
```

The new page will be generated at `/blogs/your-new-post`.

---

## Customizing the System

### Add More Frontmatter Fields

1. **Update the type:**

```typescript
// types/index.ts
export interface Blog {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  slug: string;
  content?: string;
  tags?: string[];      // NEW
  author?: string;      // NEW
  readTime?: string;    // NEW
}
```

2. **Update lib/mdx.ts:**

```typescript
return {
  slug,
  title: data.title,
  description: data.description,
  date: data.date,
  imageUrl: data.imageUrl,
  tags: data.tags || [],        // NEW
  author: data.author || '',    // NEW
  readTime: data.readTime || '', // NEW
} as Blog;
```

3. **Add to your MDX files:**

```mdx
---
title: "My Post"
description: "..."
date: "22 Jan 2026"
imageUrl: "/Blogs/..."
tags: ["React", "Next.js", "Tutorial"]
author: "Abel"
readTime: "5 min"
---
```

### Customize Blog Sorting

Edit `lib/mdx.ts` - currently sorts by date descending:

```typescript
// Sort by date (newest first)
return blogs.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
```

Change to alphabetical:
```typescript
return blogs.sort((a, b) => a.title.localeCompare(b.title));
```

### Add Categories/Filtering

```typescript
export function getBlogsByTag(tag: string): Blog[] {
  return getAllBlogs().filter(blog =>
    blog.tags?.includes(tag)
  );
}
```

---

## Advanced Features

### 1. Using React Components in MDX

With `@next/mdx`, you can import and use components directly:

```mdx
---
title: "Interactive Post"
---

import { MyChart } from '@/components/MyChart'

# Data Visualization

Here's an interactive chart:

<MyChart data={[1, 2, 3, 4, 5]} />
```

### 2. Custom MDX Components

Override default HTML elements with styled versions:

```typescript
// mdx-components.tsx (in project root)
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-[#DFFF00]">{children}</h1>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[#DFFF00] hover:underline">{children}</a>
    ),
    ...components,
  }
}
```

### 3. Better MDX Rendering with next-mdx-remote

For more control, use `next-mdx-remote`:

```bash
pnpm add next-mdx-remote
```

```typescript
// In your page component
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogDetail({ params }) {
  const blog = getBlogBySlug(params.slug);

  return (
    <MDXRemote
      source={blog.content}
      components={{
        // custom components
      }}
    />
  );
}
```

### 4. Reading Time Calculation

```typescript
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
```

### 5. Search & Pagination

```typescript
// Search
export function searchBlogs(query: string): Blog[] {
  const lowerQuery = query.toLowerCase();
  return getAllBlogs().filter(blog =>
    blog.title.toLowerCase().includes(lowerQuery) ||
    blog.description.toLowerCase().includes(lowerQuery)
  );
}

// Pagination
export function getBlogsPaginated(page: number, perPage = 6): Blog[] {
  const blogs = getAllBlogs();
  const start = (page - 1) * perPage;
  return blogs.slice(start, start + perPage);
}
```

---

## Helpful Resources

| Topic | Link |
|-------|------|
| MDX Documentation | https://mdxjs.com/ |
| Next.js MDX Setup | https://nextjs.org/docs/app/building-your-application/configuring/mdx |
| Gray Matter | https://github.com/jonschlinkert/gray-matter |
| Tailwind Typography | https://tailwindcss.com/docs/typography-plugin |

---

## Quick Reference

**Add a new post:**
1. Create `data/blogs/my-post.mdx` with frontmatter
2. Add image to `public/Blogs/`
3. Run `pnpm build`

**Debug issues:**
- Check frontmatter YAML syntax (colons, quotes)
- Verify image paths start with `/`
- Run `pnpm build` to see errors

**Common frontmatter:**
```yaml
---
title: "Required"
description: "Required"
date: "DD MMM YYYY"
imageUrl: "/Blogs/image.svg"
---
```

Happy blogging! 🚀
