import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import styles from "@/styles/Layout.module.css";
import Link from "next/link";
import { useGlobalContext } from "@/context/appContext";
// import { categories } from "@/data";

const Navbar = (props: { showNavFixed?: boolean }) => {
  const { state, toggleNav, toggleCart, setPage } = useGlobalContext();
  const { activeNav, page, cartItems } = state;
  // console.log(state.categories);

  return (
    <div className={`${props.showNavFixed && styles.fixed}`}>
      <nav className={`container ${styles.nav}`}>
        <AiOutlineMenu className={styles.menu_btn} onClick={toggleNav} />
        <ul>
          <Link href="/">
            <li className={`${activeNav === "home" && styles.active}`}>Home</li>
          </Link>
          <Link href="/about">
            <li className={`${activeNav === "about" && styles.active}`}>
              About
            </li>
          </Link>

          <div className={styles.dropdown}>
            <li
              className={`flex_end ${styles.dropdown_btn} ${
                activeNav.includes("categories") && styles.active
              }`}
            >
              Categories <AiFillCaretDown />
            </li>
            <div className={styles.bridge}></div>
            <ul className={styles.dropdown_content}>
              {state.categories.map((cat: any) => {
                // console.log(cat);

                return (
                  <div key={state.categories.indexOf(cat)}>
                    <Link href={`/categories/${cat.category}/${page}`}>
                      <li
                        onClick={() => setPage(1)}
                        className={`${
                          activeNav.includes(cat.category) &&
                          styles.active_dropdown
                        }`}
                      >
                        {cat.category}
                      </li>
                    </Link>

                    {cat.subCategory.map((subC: any) => {
                      return (
                        <Link
                          key={cat.subCategory.indexOf(subC)}
                          href={`/subCategories/${subC}/${page}`}
                        >
                          <li
                            onClick={() => setPage(1)}
                            className={`${
                              activeNav.includes(subC) && styles.active_dropdown
                            } ${styles.sub_category}`}
                          >
                            {subC}
                          </li>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </ul>
          </div>
        </ul>
        <div className={styles.nav_icons}>
          {/* <AiOutlineHeart className={styles.nav_icon} /> */}
          <div className="relative">
            <BsCart4 className={styles.nav_icon} onClick={toggleCart} />
            <span>{cartItems.length}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
