import React, { useState, useEffect } from "react";
import styles from "@/styles/Sidebar.module.css";
import { useGlobalContext } from "@/context/appContext";
import { categories } from "@/data";
import { AiOutlineClose, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";

const LeftSidebar = () => {
  const { state, closeNav, closeCart } = useGlobalContext();
  const { isNavOpen, activeNav, size, page } = state;
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    isNavOpen && closeCart();
  }, [isNavOpen]);
  return (
    <aside
      className={`${styles.sidebar} ${styles.sidebar_left} ${
        isNavOpen && styles.show
      }`}
    >
      <AiOutlineClose className={styles.close_nav} onClick={closeNav} />
      <h1 className={styles.boutique_name}>Trendy Shop</h1>
      <ul className={styles.nav}>
        <Link href="/" onClick={closeNav}>
          <li className={`${activeNav === "home" && styles.active}`}>Home</li>
        </Link>
        <Link href="/about" onClick={closeNav}>
          <li className={`${activeNav === "about" && styles.active}`}>About</li>
        </Link>

        <li
          className="flex_end"
          onClick={() => setShowCategories(!showCategories)}
        >
          Categories {showCategories ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </li>
        <ul
          className={`${styles.collapse_content} ${
            !showCategories && styles.hideCategories
          }`}
        >
          {/* {categories.map((category) => {
            return (
              <Link
                href={`/categories/${category}/size/${size}/${page}`}
                key={categories.indexOf(category)}
                onClick={closeNav}
              >
                <li
                  className={`${
                    activeNav === `categories/${category}` && styles.active
                  }`}
                >
                  {category}
                </li>
              </Link>
            );
          })} */}
          {state.categories.map((cat: any) => {
            return (
              <ul key={state.categories.indexOf(cat)}>
                <Link
                  href={`/categories/${cat.category}/${page}`}
                  onClick={closeNav}
                >
                  <li
                    className={`${
                      activeNav === `categories/${cat.category}` &&
                      styles.active
                    }`}
                  >
                    {cat.category}
                  </li>
                </Link>
                {cat.subCategory.map((sub: any) => {
                  return (
                    <Link
                      key={cat.subCategory.indexOf(sub)}
                      href={`/subCategories/${sub}/${page}`}
                      onClick={closeNav}
                    >
                      <li
                        className={`${styles.subCategory} ${
                          activeNav === `categories/${sub}` && styles.active
                        }`}
                      >
                        {sub}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            );
          })}
        </ul>
      </ul>
    </aside>
  );
};

export default LeftSidebar;
