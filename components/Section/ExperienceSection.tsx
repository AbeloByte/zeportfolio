import { experiences } from "@/data/experience";
import ExperienceItem from "@/components/UI/ExperienceItem";
import Container from "../layout/Container";

export default function ExperienceSection() {
  return (
    <section className="bg-white py-16 " id="experience">
        <Container>

      <h2 className="text-2xl md:text-4xl font-bold mb-10">Experience</h2>
      {experiences.map((item) => (
        <ExperienceItem key={item.id} exp={item} />
      ))}

      </Container>
    </section>
  );
}
