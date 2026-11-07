import Benefits from "./Benefits.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import GenderSection from "./GenderSection.jsx";

export default function MainContent({
  searchQuery,
  onAddToCart,
  products,
  catalogLoading,
  catalogError,
  selectedGender,
  onSelectGender,
}) {
  function exploreGender(gender) {
    return () => onSelectGender(gender);
  }

  return (
    <main
      id="home"
      className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 px-4 py-5 sm:gap-10 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
    >
      <section
        aria-label="Shop by collection"
        className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2"
      >
        <GenderSection
          id="women-hero"
          eyebrow="Curated haute collection"
          title="Shop Women"
          description="Discover the latest trends and timeless essentials."
          linkText="Explore Women's Collection"
          image="/images/womens-festive.webp"
          imageAlt="Woman in embroidered maroon couture attire"
          onExplore={exploreGender("women")}
        />
        <GenderSection
          id="men-hero"
          eyebrow="Bespoke festive edit"
          title="Shop Men"
          description="Upgrade your wardrobe with modern essentials."
          linkText="Explore Men's Collection"
          image="/images/mens-festive.webp"
          imageAlt="Man in embellished magenta festive attire"
          onExplore={exploreGender("men")}
        />
      </section>

      <Benefits />

      <section
        id="offer"
        aria-label="Current offer"
        className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#17283f]/10 bg-gradient-to-r from-[#17283f] via-[#223650] to-[#17283f] p-5 text-white shadow-md sm:flex-row sm:items-center sm:p-6"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c5a46d] text-[#17283f] shadow-lg">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              bolt
            </span>
          </span>
          <div>
            <h2 className="text-base font-semibold leading-6 sm:text-lg">
              A little something extra: 20% off
            </h2>
            <p className="mt-1 text-xs leading-5 text-white/75 sm:text-sm">
              Use{" "}
              <span className="rounded bg-white/10 px-2 py-1 font-bold tracking-wider text-[#e2c99e]">
                BAZAARI20
              </span>{" "}
              on orders over ₹4,999.
            </p>
          </div>
        </div>
        <a
          href="#trending"
          className="shrink-0 rounded-full bg-[#c5a46d] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#17283f] transition hover:bg-[#d4b981] active:scale-95"
        >
          Shop the edit
        </a>
      </section>

      <FeaturedProducts
        searchQuery={searchQuery}
        onAddToCart={onAddToCart}
        products={products}
        catalogLoading={catalogLoading}
        catalogError={catalogError}
        selectedGender={selectedGender}
        onSelectGender={onSelectGender}
      />
    </main>
  );
}
