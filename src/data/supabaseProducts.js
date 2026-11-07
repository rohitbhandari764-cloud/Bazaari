import { supabase } from "../lib/supabase.js";
import { formatPrice } from "./formatPrice.js";

export async function fetchSupabaseProducts() {
  if (!supabase) {
    throw new Error("Supabase is not configured for loading products.");
  }

  const { data, error } = await supabase
    .from("bazzari_products")
    .select(
      "source_id,name,brand,gender,category,description,price,currency,photo,image_url,fallback_image_url,price_label,discount,rating,reviews,original_price,source_image_unavailable",
    )
    .order("name");

  if (error) {
    throw new Error(`Supabase product request failed: ${error.message}`);
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Supabase did not return any products.");
  }

  return data.map((row) => {
    const price = Number(row.price);
    if (!row.source_id || !row.name || !Number.isFinite(price)) {
      throw new Error("Supabase returned a product with missing required fields.");
    }

    const photo =
      row.photo && typeof row.photo === "object" ? row.photo : {};
    const image = row.image_url || photo.url || "";
    const fallbackImage =
      row.fallback_image_url || photo.fallback_url || "";

    return {
      id: row.source_id,
      name: row.name,
      brand: row.brand ?? "",
      gender: row.gender,
      category: row.category,
      description: row.description ?? "",
      image,
      fallbackImage,
      sourceImageUnavailable:
        row.source_image_unavailable ??
        photo.source_image_unavailable ??
        false,
      price,
      currency: row.currency || "INR",
      priceLabel: row.price_label || formatPrice(price),
      discount: row.discount ?? "",
      rating: row.rating ?? "",
      reviews: Number(row.reviews) || 0,
      originalPrice:
        row.original_price === null ? null : Number(row.original_price),
    };
  });
}
