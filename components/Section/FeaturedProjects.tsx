"use client";

import React, { useState } from "react";
import ProjectCard from "../UI/ProjectCard";
import ProjectRow from "../UI/ProjectRow";
import { projects } from "@/data/projects";
import Container from "../layout/Container";

const FeaturedProjects = () => {
  const [view, setView] = useState<"grid" | "row">("grid");

  return (
    <div className="py-16 bg-bgColor" id="projects">
      <Container>

        {/* Header row */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl md:text-4xl font-semibold text-white font-space-grotesk">
            Featured Projects
          </h1>

          {/* Toggle buttons */}
          <div className="flex items-center border border-white/20">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`p-2.5 transition-colors ${
                view === "grid"
                  ? "bg-primaryColor text-bgColor"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {/* Grid icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="6" height="6" fill="currentColor"/>
                <rect x="11" y="1" width="6" height="6" fill="currentColor"/>
                <rect x="1" y="11" width="6" height="6" fill="currentColor"/>
                <rect x="11" y="11" width="6" height="6" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={() => setView("row")}
              aria-label="List view"
              className={`p-2.5 transition-colors border-l border-white/20 ${
                view === "row"
                  ? "bg-primaryColor text-bgColor"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {/* Row icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="2" width="16" height="3" fill="currentColor"/>
                <rect x="1" y="8" width="16" height="3" fill="currentColor"/>
                <rect x="1" y="14" width="16" height="3" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        )}

        {/* Row view */}
        {view === "row" && (
          <div className="flex flex-col">
            {projects.map((item, index) => (
              <ProjectRow key={item.id} project={item} index={index} />
            ))}
          </div>
        )}

      </Container>
    </div>
  );
};

export default FeaturedProjects;
