import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import { fetchSupabaseProducts } from "./data/supabaseProducts.js";
import { formatPrice } from "./data/formatPrice.js";
import { products as fallbackProducts } from "./data/products.js";
import SignIn from "./components/SignIn.jsx";
import { supabase, supabaseConfigError } from "./lib/supabase.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogError, setCatalogError] = useState("");
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return undefined;
    }

    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setUser(session?.user ?? null);
        setAuthReady(true);
        setAuthError("");
      }
    });

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setAuthError(error.message);
        } else {
          setUser(data.session?.user ?? null);
        }
        setAuthReady(true);
      })
      .catch((error) => {
        console.error("Unable to restore the Supabase session:", error);
        if (active) {
          setAuthError("Could not check your sign-in session. Please reload and try again.");
          setAuthReady(true);
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;

    fetchSupabaseProducts()
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
  const cartSubtotal = cartTotals.INR ?? 0;
  const gstAmount = Math.round(cartSubtotal * 0.18);
  const platformFee = cartItems.length > 0 ? 12 : 0;
  const cartTotal = cartSubtotal + gstAmount + platformFee;

  async function handleLogout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
      return;
    }
    setCartItems([]);
    setCartOpen(false);
  }

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f2ec] text-sm text-[#17283f]">
        Checking your sign-in…
      </main>
    );
  }

  if (!user) {
    return (
      <SignIn
        configurationError={supabaseConfigError}
        sessionError={authError}
      />
    );
  }

  const account = {
    name:
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "Account",
    email: user.email ?? "",
  };

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
      {authError && (
        <p
          role="alert"
          className="fixed bottom-4 right-4 z-[70] max-w-sm rounded-xl bg-rose-700 px-4 py-3 text-sm text-white shadow-xl"
        >
          {authError}
        </p>
      )}
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
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(cartSubtotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 text-gray-600">
                      <dt>GST (18%)</dt>
                      <dd>{formatPrice(gstAmount)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 text-gray-600">
                      <dt>Platform fee</dt>
                      <dd>{formatPrice(platformFee)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-[#e9e4dc] pt-3 text-base font-semibold">
                      <dt>Total</dt>
                      <dd>{formatPrice(cartTotal)}</dd>
                    </div>
                  </dl>
                  {checkoutMessage && (
                    <p role="status" className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
                      {checkoutMessage}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setCheckoutMessage(
                        "Online payment is not set up yet. Connect a payment provider to complete your purchase.",
                      )
                    }
                    className="mt-4 w-full rounded-full bg-[#17283f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263b58]"
                  >
                    Pay now · {formatPrice(cartTotal)}
                  </button>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Payment processing is not configured yet.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
