import Navbar from "./Navbar";
import styles from "@/styles/Layout.module.css";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";
import Cart from "./Cart";
import react, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/appContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state } = useGlobalContext();
  const { activeNav } = state;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavFixed, setShowNavFixed] = useState(false);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollPosition > 155 ? setShowNavFixed(true) : setShowNavFixed(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
  return (
    <div className="vh">
      <div>
        <header className={`${activeNav === "home" && styles.home_header}`}>
          <div className={styles.top}>
            {/* <p>Book an appointment +213770000077</p> */}
            <h1 className={styles.boutique_name}>Trendy Shop</h1>
            <h5>For best deals</h5>
          </div>
          <Navbar />
          {showNavFixed && <Navbar showNavFixed={showNavFixed} />}
        </header>
        <LeftSidebar />
        <Cart />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
