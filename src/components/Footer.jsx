const footerGroups = [
  {
    title: "Get to know us",
    links: [
      "About Bazaari",
      "Our artisanal heritage",
      "Careers at Bazaari",
      "Our sustainability promise",
      "Press and editorial",
    ],
  },
  {
    title: "Connect with us",
    links: ["Instagram", "Facebook", "Twitter / X", "LinkedIn", "YouTube"],
  },
  {
    title: "Partner with us",
    links: [
      "Sell on Bazaari",
      "Become a verified atelier",
      "Affiliate programme",
      "Brand partnerships",
    ],
  },
  {
    title: "Let us help",
    links: [
      "Your account",
      "Orders and tracking",
      "Returns and refunds",
      "Shipping information",
      "Customer care",
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#17283f] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4 md:gap-10">
          {footerGroups.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2
                id={`footer-${group.title}`}
                className="text-xs font-bold tracking-wide text-white sm:text-sm"
              >
                {group.title}
              </h2>
              <nav className="mt-4 flex flex-col items-start gap-3">
                {group.links.map((link) => (
                  <a
                    key={link}
                    href="#home"
                    className="text-[11px] leading-4 text-white/60 transition-colors hover:text-white sm:text-xs"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </section>
          ))}
        </div>

        <div className="my-9 h-px bg-white/15 sm:my-10" />

        <div className="flex flex-col items-center gap-5 text-center">
          <a
            href="#home"
            className="font-serif text-xl font-semibold tracking-[0.16em] text-white"
          >
            BAZAARI
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-white/60 sm:text-xs">
            {["Terms of use", "Privacy notice", "Cookie preferences", "Accessibility"].map(
              (link) => (
                <a key={link} href="#home" className="transition-colors hover:text-white">
                  {link}
                </a>
              ),
            )}
          </div>
          <p className="text-[10px] text-white/45 sm:text-[11px]">
            © 2026 Bazaari. A world of style, thoughtfully curated.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[#d4b981] transition-colors hover:text-white"
          >
            Back to top
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              arrow_upward
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
