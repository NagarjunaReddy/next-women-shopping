import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import AutoSuggest from "../auto-suggest";
import products from "../../utils/data/products";


import type { RootState } from "@/store";
const testData = products.map((item) =>
   item.name
  );

const fetchSuggestions = async (query: string): Promise<string[]> => {
  return testData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
};
const Header = () => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(router.pathname)),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname)) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  });

  const closeMenu = () => {
    setMenuOpen(false);
  };

 
  // on click outside
  useOnClickOutside(navRef, closeMenu);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <div className="image-logo">
              <img className="image-logo" src='/images/logo.jpg' alt="" />
            </div>
            Home
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>
        
        <div className="site-header__actions">
          <AutoSuggest fetchSuggestions={fetchSuggestions} />
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login" legacyBehavior>
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
