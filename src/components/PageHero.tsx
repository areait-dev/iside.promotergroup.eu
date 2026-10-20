import Image from "next/image";
import HeroSlides, { type Slide } from "./HeroSlides";
import { useId } from "react";

type Props = {
  image: string;
  alt: string;
  title: string;
  /** object-position CSS per scegliere quale parte della foto resta visibile nel ritaglio (es. "50% 75%"). */
  position?: string;
  /** Più foto in dissolvenza al posto di `image` (la prima è quella che si vede subito). */
  slides?: Slide[];
};

export default function PageHero({ image, alt, title, position, slides }: Props) {
  const titleId = useId();
  return (
    <section
      id="hero"
      aria-labelledby={titleId}
      className="on-dark relative flex h-[min(70svh,560px)] min-h-[420px] items-end overflow-hidden bg-night text-inverse"
    >
      {slides && slides.length > 1 ? (
        <HeroSlides slides={slides} />
      ) : (
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_79_113/0.74)_0%,rgb(0_79_113/0.62)_28%,rgb(0_79_113/0.18)_62%,rgb(0_79_113/0)_100%)]" />
      <div className="page-container relative pb-s8 pt-header md:pb-s9">
        <h1 id={titleId} className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance">
          {title}
        </h1>
      </div>
    </section>
  );
}
