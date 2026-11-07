import { useEffect, useState } from "react";
import { formatPrice } from "../data/formatPrice.js";

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) {
  const [added, setAdded] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image);

  useEffect(() => {
    if (!added) return undefined;
    const timeoutId = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timeoutId);
  }, [added]);

  useEffect(() => {
    setImageSrc(product.image);
  }, [product.image]);

  function handleImageError() {
    if (product.fallbackImage && imageSrc !== product.fallbackImage) {
      setImageSrc(product.fallbackImage);
    }
  }

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#ebe6dd] bg-white p-3.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4">
      <div>
        <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-[#f2eee7]">
          <img
            src={imageSrc}
            alt={`${product.name} — ${product.category}`}
            loading="lazy"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-[#c5a46d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#17283f] shadow-sm">
            {product.discount}
          </span>
          <button
            type="button"
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${
              isWishlisted ? "text-rose-600" : "text-[#17283f] hover:text-rose-600"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
              aria-hidden="true"
            >
              favorite
            </span>
          </button>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#947545]">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-[#17283f] transition-colors group-hover:text-[#947545] sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#73767b]">
          {product.description}
        </p>
        {(product.rating || product.reviews > 0) && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#c5a46d]" aria-hidden="true">
              {product.rating ? "star" : "reviews"}
            </span>
            {product.rating && (
              <span className="font-bold text-[#17283f]">{product.rating}</span>
            )}
            {product.reviews > 0 && (
              <span className="text-[#777a7e]">
                ({product.reviews} {product.rating ? "reviews" : "ratings"})
              </span>
            )}
          </div>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#17283f]">
            {product.priceLabel || formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#8b8b89] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onAddToCart(product);
          setAdded(true);
        }}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] shadow-sm transition active:scale-95 sm:text-[11px] ${
          added
            ? "bg-emerald-700 text-white"
            : "bg-[#c5a46d] text-[#17283f] hover:bg-[#d4b981]"
        }`}
      >
        <span className="material-symbols-outlined text-[17px]" aria-hidden="true">
          {added ? "check" : "shopping_bag"}
        </span>
        {added ? "Added to bag" : "Add to bag"}
      </button>
    </article>
  );
}
