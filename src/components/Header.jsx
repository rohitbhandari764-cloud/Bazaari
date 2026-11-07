import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#trending" },
  { label: "Men", href: "#trending", gender: "men" },
  { label: "Women", href: "#trending", gender: "women" },
  { label: "New arrivals", href: "#trending" },
  { label: "Sale", href: "#offer" },
];

export default function Header({
  cartCount,
  onSearch,
  onOpenCart,
  onSelectGender,
  account,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query.trim());
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleNavigation(event, link) {
    if (!link.gender) return;
    event.preventDefault();
    onSelectGender(link.gender);
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  }

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-[#17283f] text-white">
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-5 px-4 sm:px-8 lg:px-12">
          <a
            href="#home"
            className="shrink-0 font-serif text-2xl font-semibold tracking-[0.16em] transition-colors hover:text-[#d4b981]"
            aria-label="Bazaari home"
          >
            BAZAARI
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
                className={`border-b-2 py-1 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:text-[#d4b981] ${
                  index === 0
                    ? "border-[#c5a46d] text-[#d4b981]"
                    : "border-transparent text-white/85"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                className="flex items-center gap-2 text-white/90 transition-colors hover:text-[#d4b981]"
              >
                <span className="material-symbols-outlined text-[21px]" aria-hidden="true">person</span>
                <span className="hidden max-w-28 truncate text-[11px] font-medium uppercase tracking-wider lg:inline">
                  {account?.name || "Account"}
                </span>
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-4 w-64 rounded-xl border border-[#e9e4dc] bg-white p-4 text-[#17283f] shadow-xl">
                  <p className="text-sm font-semibold">{account?.name}</p>
                  <p className="mt-1 truncate text-xs text-[#73767b]">{account?.email}</p>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="mt-4 w-full rounded-full border border-[#ded8ce] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#f5f2ec]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
            <a
              href="#trending"
              className="hidden items-center gap-2 text-white/90 transition-colors hover:text-[#d4b981] sm:flex"
            >
              <span className="material-symbols-outlined text-[21px]" aria-hidden="true">
                favorite
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-wider lg:inline">
                Wishlist
              </span>
            </a>
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-[#d4b981]"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <span className="relative flex">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  shopping_bag
                </span>
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a46d] text-[9px] font-bold leading-none text-[#17283f]">
                  {cartCount}
                </span>
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-wider lg:inline">
                Cart
              </span>
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-white/10 px-4 py-3 xl:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-[1600px] flex-wrap gap-x-6 gap-y-3 sm:px-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => handleNavigation(event, link)}
                  className="py-2 text-xs font-medium uppercase tracking-widest text-white/90 hover:text-[#d4b981]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>

      <div className="border-b border-[#e6ddce] bg-[#f3eadc] px-4 py-2.5 sm:px-8 lg:px-12">
        <form
          className="mx-auto flex h-10 max-w-3xl items-center rounded-full border border-[#e2d6c3] bg-white px-3 shadow-sm sm:h-11 sm:px-4"
          role="search"
          onSubmit={handleSubmit}
        >
          <span
            className="material-symbols-outlined shrink-0 text-[20px] text-[#75777c]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            aria-label="Search catalog"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, brands and collections"
            className="min-w-0 flex-1 border-0 bg-transparent px-3 text-xs text-[#17283f] outline-none placeholder:text-[#85827d] focus:ring-0 sm:text-sm"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#c5a46d] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#17283f] transition hover:bg-[#d4b981] active:scale-95 sm:px-6 sm:text-[11px]"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
