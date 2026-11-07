const benefits = [
  {
    icon: "local_shipping",
    title: "Express delivery",
    description: "Complimentary across India on orders ₹999+",
  },
  {
    icon: "verified_user",
    title: "Genuine luxury",
    description: "Direct brand provenance and certified pieces",
  },
  {
    icon: "published_with_changes",
    title: "Hassle-free returns",
    description: "Easy doorstep returns with our concierge",
  },
];

export default function Benefits() {
  return (
    <section
      aria-label="The Bazaari experience"
      className="grid gap-3 rounded-2xl border border-[#e9e3d8] bg-white p-4 shadow-sm md:grid-cols-3 md:p-6"
    >
      {benefits.map((benefit, index) => (
        <article
          key={benefit.title}
          className={`flex items-center gap-4 px-2 py-3 sm:px-4 ${
            index < benefits.length - 1
              ? "border-b border-[#e9e3d8] md:border-b-0 md:border-r"
              : ""
          }`}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c5a46d]/15 text-[#9b7335]">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {benefit.icon}
            </span>
          </span>
          <span>
            <span className="block text-sm font-semibold text-[#17283f]">
              {benefit.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-[#777a7e]">
              {benefit.description}
            </span>
          </span>
        </article>
      ))}
    </section>
  );
}
