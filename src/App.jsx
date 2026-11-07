import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import { fetchFashionProducts } from "./data/fashionApi.js";
import { formatPrice } from "./data/formatPrice.js";
import { products as fallbackProducts } from "./data/products.js";
import SignIn from "./components/SignIn.jsx";

export default function App() {
  const [account, setAccount] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("bazaari-account") || "null");
    } catch {
      return null;
    }
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogError, setCatalogError] = useState("");
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchFashionProducts()
      .then((loadedProducts) => {
        if (active) setCatalogProducts(loadedProducts);
      })
      .catch((error) => {
        console.error("Unable to load the Bazaari fashion catalog:", error);
        if (active) {
          setCatalogProducts(fallbackProducts);
          setCatalogError(
            "The live catalog could not be loaded. Showing the saved Bazaari edit instead.",
          );
        }
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotals = cartItems.reduce((totals, item) => {
    const currency = item.currency ?? "INR";
    totals[currency] = (totals[currency] ?? 0) + item.price * item.quantity;
    return totals;
  }, {});

  function handleSignIn(details) {
    window.localStorage.setItem("bazaari-account", JSON.stringify(details));
    setAccount(details);
  }

  function handleLogout() {
    window.localStorage.removeItem("bazaari-account");
    setAccount(null);
    setCartItems([]);
    setCartOpen(false);
  }

  if (!account) return <SignIn onSignIn={handleSignIn} />;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f6f1] font-sans text-[#17283f] antialiased">
      <Header
        cartCount={cartCount}
        onSearch={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
        onSelectGender={setSelectedGender}
        account={account}
        onLogout={handleLogout}
      />
      <MainContent
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
        products={catalogProducts}
        catalogLoading={catalogLoading}
        catalogError={catalogError}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
      />
      <Footer />
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setCartOpen(false)}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e9e4dc] pb-4">
              <h2 id="cart-title" className="font-serif text-2xl font-semibold">Your bag ({cartCount})</h2>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-gray-100">
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-500">Your bag is empty.</p>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-[#e9e4dc] overflow-y-auto">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <img
                        src={item.image}
                        alt=""
                        onError={(event) => {
                          const image = event.currentTarget;
                          if (
                            item.fallbackImage &&
                            image.dataset.fallbackApplied !== "true"
                          ) {
                            image.dataset.fallbackApplied = "true";
                            image.src = item.fallbackImage;
                          }
                        }}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="text-sm font-semibold text-[#17283f]">{item.name}</h3>
                        <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="mt-2 font-semibold text-[#17283f]">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button type="button" aria-label={`Remove ${item.name} from bag`} onClick={() => setCartItems((items) => items.filter((cartItem) => cartItem.id !== item.id))} className="self-center text-xs text-gray-500 underline hover:text-rose-600">Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#e9e4dc] pt-4">
                  <div className="flex justify-between gap-4 font-semibold">
                    <span>Subtotal</span>
                    <span className="text-right">
                      {Object.entries(cartTotals).map(([currency, total]) => (
                        <span key={currency} className="block">
                          {formatPrice(total)}
                        </span>
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
