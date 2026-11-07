export default function GenderSection({
  id,
  eyebrow,
  title,
  description,
  linkText,
  image,
  imageAlt,
  onExplore,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="group relative isolate flex min-h-[520px] scroll-mt-36 items-end overflow-hidden rounded-[1.75rem] bg-[#17283f] shadow-xl sm:min-h-[640px] lg:min-h-[760px]"
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-colors duration-500 group-hover:from-black/90" />
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pb-10 text-center text-white sm:pb-14 lg:pb-16">
        <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e2c99e] sm:text-xs">
          {eyebrow}
        </span>
        <h2
          id={`${id}-title`}
          className="font-serif text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/90 sm:text-base">
          {description}
        </p>
        <a
          href="#trending"
          onClick={onExplore}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold tracking-wide text-[#17283f] shadow-lg transition duration-300 hover:scale-105 hover:bg-[#d7bd8e] active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
        >
          {linkText}
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_forward
          </span>
        </a>
      </div>
    </section>
  );
}
