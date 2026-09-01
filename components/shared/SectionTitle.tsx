import { Reveal, WordReveal } from "@/components/motion";

interface SectionTitleProps {
  /** Section number shown above the title, e.g. "02" or "—". */
  index?: string;
  /** Small label sitting next to the index. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  index,
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <Reveal className={className}>
      {(index || eyebrow) && (
        <div className="flex items-center gap-3 mb-4">
          {index && (
            <span className="text-xs font-mono text-primaryColor leading-none">
              {index}
            </span>
          )}
          {index && eyebrow && (
            <span aria-hidden className="h-px w-8 bg-white/20" />
          )}
          {eyebrow && (
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 leading-none">
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <WordReveal
        as="h2"
        text={title}
        className="text-2xl md:text-4xl font-semibold text-white font-space-grotesk"
      />

      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm md:text-base text-white/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
