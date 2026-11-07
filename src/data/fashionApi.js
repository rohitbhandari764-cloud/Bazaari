import { formatPrice } from "./formatPrice.js";

const catalogUrl =
  "https://raw.githubusercontent.com/madiha2323/Api/1733cf510228007f5aeb9c826d7b98635196b027/data.json";
export const USD_TO_INR_RATE = 94.537031;
export const EXCHANGE_RATE_DATE = "6 Nov 2026";

const categoryDetails = {
  menshirt: { gender: "men", category: "Shirts" },
  jackets: { gender: "men", category: "Jackets" },
  hoodies: { gender: "men", category: "Hoodies & Sweatshirts" },
  maleshoes: { gender: "men", category: "Shoes" },
  menpants: { gender: "men", category: "Pants" },
  femaleshirt: { gender: "women", category: "Tops & Dresses" },
  femaleshoes: { gender: "women", category: "Shoes" },
  femalepants: { gender: "women", category: "Pants" },
  accessories: { gender: "unisex", category: "Accessories" },
};

const productPhotos = {
  menshirt: [
    "photo-1596755094514-f87e34085b2c",
    "photo-1598033129183-c4f50c736f10",
    "photo-1602810318383-e386cc2a3ccf",
    "photo-1627225924765-552d49cf47ad",
    "photo-1576566588028-4147f3842f27",
    "photo-1581655353564-df123a1eb820",
  ],
  jackets: [
    "photo-1551028719-00167b16eac5",
    "photo-1611312449408-fcece27cdbb7",
    "photo-1539533018447-63fcce2678e3",
    "photo-1591047139829-d91aecb6caea",
    "photo-1548126032-079a0fb0099d",
    "photo-1551488831-00ddcb6c6bd3",
  ],
  hoodies: [
    "photo-1556821840-3a63f95609a7",
    "photo-1578681994506-b8f463449011",
    "photo-1609873814058-a8928924184a",
    "photo-1620799140408-edc6dcb6d633",
    "photo-1485230895905-ec40ba36b9bc",
    "photo-1618354691229-88d47f285158",
  ],
  maleshoes: [
    "photo-1542291026-7eec264c27ff",
    "photo-1495555961986-6d4c1ecb7be3",
    "photo-1600185365483-26d7a4cc7519",
    "photo-1549298916-b41d501d3772",
    "photo-1539185441755-769473a23570",
    "photo-1608256246200-53e635b5b65f",
  ],
  menpants: [
    "photo-1624378439575-d8705ad7ae80",
    "photo-1473966968600-fa801b869a1a",
    "photo-1591195853828-11db59a44f6b",
    "photo-1511196044526-5cb3bcb7071b",
    "photo-1548883354-94bcfe321cbb",
    "photo-1542272604-787c3835535d",
  ],
  femaleshirt: [
    "photo-1503342217505-b0a15ec3261c",
    "photo-1485230895905-ec40ba36b9bc",
    "photo-1515372039744-b8f02a3ae446",
    "photo-1509631179647-0177331693ae",
    "photo-1564584217132-2271feaeb3c5",
    "photo-1490481651871-ab68de25d43d",
  ],
  femaleshoes: [
    "photo-1543163521-1bf539c55dd2",
    "photo-1560343090-f0409e92791a",
    "photo-1608231387042-66d1773070a5",
    "photo-1514989940723-e8e51635b782",
    "photo-1495555961986-6d4c1ecb7be3",
    "photo-1525966222134-fcfa99b8ae77",
  ],
  femalepants: [
    "photo-1475178626620-a4d074967452",
    "photo-1541099649105-f69ad21f3246",
    "photo-1594633312681-425c7b97ccd1",
    "photo-1591195853828-11db59a44f6b",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1517438476312-10d79c077509",
  ],
  accessories: [
    "photo-1523275335684-37898b6baf30",
    "photo-1524805444758-089113d48a6d",
    "photo-1523170335258-f5ed11844a49",
    "photo-1511499767150-a48a237f0083",
    "photo-1572635196237-14b3f281503f",
    "photo-1508296695146-257a814070b4",
  ],
};

const productCopy = {
  menshirt: [
    ["Blue Denim Button-Down Shirt", "A blue denim button-down shirt with a classic collar."],
    ["White Dress Shirt", "A crisp white dress shirt styled for a smart, polished look."],
    ["Multi-Colour Button-Down Shirts", "A selection of neatly folded button-down shirts in versatile colours."],
    ["White Graphic T-Shirt", "A white graphic T-shirt with a relaxed everyday fit."],
    ["Printed Graphic T-Shirt", "A casual printed T-shirt with a bold graphic design."],
    ["White Crewneck T-Shirt", "A simple white crewneck T-shirt for everyday wear."],
  ],
  femaleshirt: [
    ["Black Graphic T-Shirt", "A casual black graphic tee paired with everyday denim."],
    ["Red Statement Sweatshirt", "A red graphic sweatshirt with a relaxed fit."],
    ["White Off-Shoulder Dress", "A light white off-shoulder dress for sunny days."],
    ["Black Sleeveless Top", "A black sleeveless top styled with wide-leg trousers."],
    ["White Sleeveless Top", "A clean white sleeveless top styled with blue denim."],
    ["Everyday Tops Collection", "A curated selection of women's tops in assorted colours."],
  ],
  hoodies: [
    ["Classic Grey Hoodie", "A relaxed grey hoodie with an easy everyday fit."],
    ["Black Graphic Sweatshirt", "A black graphic sweatshirt for casual outfits."],
    ["Yellow Graphic Hoodie", "A bright yellow hoodie with a bold back print."],
    ["White Crewneck Sweatshirt", "A clean white crewneck sweatshirt for easy layering."],
    ["Red Graphic Sweatshirt", "A red statement sweatshirt with a bold front graphic."],
    ["Black Long-Sleeve Sweatshirt", "A black long-sleeve sweatshirt for casual layering."],
  ],
  jackets: [
    ["Faux Leather Biker Jacket", "A black faux-leather biker jacket with classic zip details."],
    ["Denim Trucker Jacket", "A structured denim jacket for easy everyday layering."],
    ["All-Gender Trench Coat", "A timeless camel trench coat with a belted silhouette."],
    ["Bomber Jacket", "A lightweight bomber jacket in a warm neutral shade."],
    ["Retro Down Puffer Jacket", "A warm black puffer jacket for cold-weather days."],
    ["Winter Jacket Edit", "A curated selection of jackets for cooler weather."],
  ],
  menpants: [
    ["Black Straight-Leg Trousers", "Black straight-leg trousers with a classic fit."],
    ["Slim-Fit Chinos", "Neutral slim-fit chinos for casual and smart outfits."],
    ["Denim Shorts", "Light-wash denim shorts for warm-weather dressing."],
    ["Distressed Jeans", "Dark distressed jeans with a relaxed streetwear look."],
    ["Cargo Trousers", "Utility cargo trousers with a relaxed fit."],
    ["Classic Denim Jeans", "A classic pair of denim jeans for everyday wear."],
  ],
  femalepants: [
    ["Women's Skinny Jeans", "Blue skinny jeans for an easy everyday look."],
    ["Distressed Women's Jeans", "Women's jeans with a casual distressed finish."],
    ["Relaxed Joggers", "Soft joggers with a relaxed tapered leg."],
    ["Denim Shorts", "Light-wash denim shorts for warm days."],
    ["Yellow Statement Trousers", "Bright yellow trousers with a playful print."],
    ["Printed Joggers", "Relaxed printed trousers for a bold casual look."],
  ],
  maleshoes: [
    ["Red Running Sneakers", "Lightweight red running sneakers for active days."],
    ["Classic Everyday Shoes", "A versatile pair of classic everyday shoes."],
    ["White Sport Sneakers", "Clean white sport sneakers with a bright accent."],
    ["Leather Low-Top Sneakers", "Low-top leather sneakers for casual outfits."],
    ["Retro Running Sneakers", "Retro running sneakers with a streamlined profile."],
    ["Leather Ankle Boots", "Polished leather ankle boots for a classic look."],
  ],
  femaleshoes: [
    ["Floral High Heels", "Floral high heels for a dressy occasion."],
    ["Classic Loafers", "Classic slip-on loafers with a polished finish."],
    ["White Low-Top Sneakers", "Simple white low-top sneakers for everyday wear."],
    ["Red Sport Sneakers", "Bright red sport sneakers with a cushioned sole."],
    ["Classic Sneakers", "Classic casual sneakers for everyday outfits."],
    ["Canvas Sneakers", "Colourful canvas sneakers with a relaxed feel."],
  ],
  accessories: [
    ["Classic White-Dial Watch", "A clean white-dial watch for everyday wear."],
    ["Leather-Strap Chronograph", "A classic chronograph with a leather strap."],
    ["Stainless-Steel Watch", "A polished stainless-steel watch with a dark dial."],
    ["Round Sunglasses", "Round-frame sunglasses with tinted lenses."],
    ["Classic Black Sunglasses", "Classic black-frame sunglasses for sunny days."],
    ["Tortoiseshell Sunglasses", "Tortoiseshell-frame sunglasses with dark lenses."],
  ],
};

function getProductPhoto(categoryKey, index) {
  const photos = productPhotos[categoryKey];
  if (!photos?.length) return undefined;

  const photo = photos[index % photos.length];
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=700&q=80`;
}

function getPrice(value) {
  const parsed = Number.parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function getProductCopy(categoryKey, item, index, details) {
  const type = String(item.type ?? "").trim();
  const productCategory =
    categoryKey === "accessories"
      ? type || details.category
      : details.category;
  const curatedCopy = productCopy[categoryKey]?.[index];
  if (curatedCopy) {
    return {
      name: curatedCopy[0],
      description: curatedCopy[1],
      productCategory,
    };
  }

  const originalName = String(item.name ?? "").trim().replace(/[. ]+$/, "");
  const name =
    originalName ||
    (type
      ? `${type} ${productCategory}`
      : `${productCategory} ${index + 1}`);

  let description = "";
  if (categoryKey === "menshirt") {
    description = `${name} for smart, everyday dressing.`;
  } else if (categoryKey === "femaleshirt") {
    description = `${name} for relaxed everyday styling.`;
  } else if (categoryKey === "jackets") {
    description = `${name}, a versatile outer layer for cooler days.`;
  } else if (categoryKey === "hoodies") {
    description = `${name}, a comfortable layer for casual days.`;
  } else if (categoryKey === "menpants" || categoryKey === "femalepants") {
    const fit = type.toLowerCase().replace("cigratte", "cigarette");
    description = `${fit || "Everyday"}-fit ${details.category.toLowerCase()} for comfortable daily wear.`;
  } else {
    description =
      String(item.description ?? "").trim() ||
      `${name} selected for the Bazaari edit.`;
  }

  return { name, description, productCategory };
}

function toProduct(categoryKey, item, index) {
  const details = categoryDetails[categoryKey];
  if (!details) return null;

  const brand = String(item.brand ?? "").trim();
  const copy = getProductCopy(categoryKey, item, index, details);
  const sourceImage = String(item.image ?? "").trim();
  const apiImage = sourceImage
    ? new URL(sourceImage.replace(/^\.\//, ""), catalogUrl).href
    : undefined;
  const image = getProductPhoto(categoryKey, index) ?? apiImage;
  const sourcePrice = getPrice(item.price);
  const isDollarPrice = String(item.price ?? "").includes("$");
  const price = Math.round(
    isDollarPrice ? sourcePrice * USD_TO_INR_RATE : sourcePrice,
  );
  const priceCategory = copy.productCategory ?? details.category;

  return {
    id: `${categoryKey}-${item.id ?? index + 1}`,
    name: copy.name,
    brand,
    gender: details.gender,
    category: priceCategory,
    description: copy.description,
    image,
    fallbackImage:
      getProductPhoto(categoryKey, index + 1) ?? apiImage,
    sourceImageUnavailable: Boolean(sourceImage),
    price,
    currency: "INR",
    priceLabel: formatPrice(price),
    discount: item.sale ? `${String(item.sale).replace(/%?$/, "%")} off` : "",
    rating: "",
    reviews: item.reviews ? Number.parseInt(item.reviews, 10) || 0 : 0,
    originalPrice: null,
  };
}

export async function fetchFashionProducts() {
  const response = await fetch(catalogUrl);
  if (!response.ok) {
    throw new Error(`Fashion catalog request failed (${response.status}).`);
  }

  const data = await response.json();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Fashion catalog returned an unexpected response.");
  }

  const products = Object.entries(data).flatMap(([categoryKey, items]) => {
    if (!Array.isArray(items)) {
      throw new Error(`Fashion catalog category "${categoryKey}" is not a list.`);
    }

    return items
      .map((item, index) => toProduct(categoryKey, item, index))
      .filter(Boolean);
  });

  if (products.length === 0) {
    throw new Error("Fashion catalog did not contain any supported products.");
  }

  return products;
}
