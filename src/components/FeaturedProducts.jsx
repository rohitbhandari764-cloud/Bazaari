import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { EXCHANGE_RATE_DATE, USD_TO_INR_RATE } from "../data/fashionApi.js";

const genders = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "unisex", label: "Accessories" },
];

export default function FeaturedProducts({
  searchQuery,
  onAddToCart,
  products,
  catalogLoading,
  catalogError,
  selectedGender,
  onSelectGender,
}) {
  const [wishlistedProducts, setWishlistedProducts] = useState(() => new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const normalizedQuery = searchQuery.toLocaleLowerCase();
  const genderProducts = products.filter(
    (product) =>
      selectedGender === "all" || product.gender === selectedGender,
  );
  const categories = [
    "all",
    ...new Set(genderProducts.map((product) => product.category).filter(Boolean)),
  ];
  const visibleProducts = genderProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.brand} ${product.category} ${product.description}`
      .toLocaleLowerCase()
      .includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setSelectedCategory("all");
  }, [selectedGender]);

  function toggleWishlist(productId) {
    setWishlistedProducts((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }

  return (
    <section id="trending" className="scroll-mt-36 py-2" aria-labelledby="trending-title">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="trending-title"
              className="font-serif text-3xl font-semibold tracking-tight text-[#17283f] sm:text-4xl"
            >
              {selectedGender === "all"
                ? "Trending now"
                : selectedGender === "women"
                  ? "The women’s edit"
                  : selectedGender === "men"
                    ? "The men’s edit"
                    : "Accessories"}
            </h2>
            <span className="rounded-full bg-[#c5a46d]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#80602e]">
              The edit
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64686e]">
            Discover considered pieces from independent labels, master artisans, and
            the world&apos;s most loved fashion houses.
          </p>
          <p className="mt-1 text-[11px] text-[#777a7e]">
            Prices shown in INR · USD converted at ₹
            {USD_TO_INR_RATE.toFixed(2)} per $1 ({EXCHANGE_RATE_DATE}).
          </p>
        </div>
        <a
          href="#women"
          className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#80602e] transition-all hover:gap-2 hover:underline sm:self-auto"
        >
          Explore the collections
          <span className="material-symbols-outlined text-[17px]" aria-hidden="true">
            chevron_right
          </span>
        </a>
      </div>

      <div className="mb-4 flex flex-wrap gap-2" aria-label="Shop by gender">
        {genders
          .filter(
            (gender) =>
              gender.id !== "unisex" ||
              products.some((product) => product.gender === "unisex"),
          )
          .map((gender) => (
            <button
              key={gender.id}
              type="button"
              onClick={() => onSelectGender(gender.id)}
              aria-pressed={selectedGender === gender.id}
              className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition sm:text-xs ${
                selectedGender === gender.id
                  ? "border-[#17283f] bg-[#17283f] text-white"
                  : "border-[#ded6c9] bg-white text-[#17283f] hover:border-[#c5a46d]"
              }`}
            >
              {gender.label}
            </button>
          ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-2" aria-label="Filter by product category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
              selectedCategory === category
                ? "bg-[#c5a46d]/25 text-[#73572d]"
                : "bg-[#eeebe5] text-[#66676b] hover:bg-[#c5a46d]/15"
            }`}
          >
            {category === "all" ? "All categories" : category}
          </button>
        ))}
      </div>

      {catalogError && (
        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          {catalogError}
        </p>
      )}
      {products.some((product) => product.sourceImageUnavailable) && (
        <p className="mb-4 rounded-lg border border-[#e9e3d8] bg-white px-4 py-3 text-xs leading-5 text-[#64686e]">
          The linked API&apos;s original product photos are missing, so these are
          representative category photos. Product names and descriptions now match
          the items shown.
        </p>
      )}
      {searchQuery && (
        <p className="mb-4 text-xs text-[#64686e]" aria-live="polite">
          {visibleProducts.length
            ? `${visibleProducts.length} result${visibleProducts.length === 1 ? "" : "s"} for “${searchQuery}”`
            : `No products found for “${searchQuery}”. Try another search.`}
        </p>
      )}

      {catalogLoading && (
        <p className="py-8 text-center text-sm text-[#64686e]" aria-live="polite">
          Loading the latest fashion collection…
        </p>
      )}
      {!catalogLoading && visibleProducts.length === 0 && (
        <p className="rounded-xl border border-[#e9e3d8] bg-white px-5 py-10 text-center text-sm text-[#64686e]">
          {searchQuery
            ? "No products match this search. Try another term or category."
            : "No products are available in this category yet."}
        </p>
      )}
      {visibleProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistedProducts.has(product.id)}
              onToggleWishlist={toggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
