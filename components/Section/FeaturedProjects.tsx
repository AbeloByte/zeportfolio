import React from "react";

import ProjectCard from "../UI/ProjectCard";

import { projects } from "@/data/projects";
import Container from "../layout/Container";
import FriendRobot from "../shared/FriendRobot";


const FeaturedProjects = () => {
  return <div className="my-21">
    <Container>
        <h1 className="text-4xl font-semibold mb-12 text-white font-space-grotesk">Projects</h1>
        {/* The Map function loops through your 5 projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center md:place-items-start">
        {projects.map((item) => (
          <ProjectCard key={item.id} project={item} />
        ))}
      </div>
    </Container>
  </div>;
};

export default FeaturedProjects;
