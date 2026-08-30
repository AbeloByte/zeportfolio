// src/components/BlogCard.tsx
"use client";

import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group md:w-94.5 flex flex-col bg-black text-white overflow-hidden border border-gray-700 hover:border-[#DFFF00]/50 transition-colors h-full"
    >

      {/* Top Content: Text Padding */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold leading-tight mb-4 font-mono group-hover:text-[#DFFF00] transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm mb-8 line-clamp-3">
          {blog.description}
        </p>

        {/* Date and Button Row */}
        <div className="mt-auto flex justify-between items-center pb-4">
          <span className="text-[#DFFF00] text-xs font-mono">{blog.date}</span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="bg-white text-black px-4 py-1 text-xs font-bold border-r-4 border-b-4 border-[#DFFF00] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Bottom Content: Image */}
      <div className="relative  h-60 w-full  transition-all duration-500">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
