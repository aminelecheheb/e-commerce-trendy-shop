import React from "react";
import styles from "@/styles/Layout.module.css";
import Link from "next/link";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillPhone,
} from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* <div className={styles.flex}>
          <div className={styles.services}>
            <h3>Services</h3>
            <Link href="/">Traditional clothing rental</Link>
            <Link href="/">Tasdira Outfits rental</Link>
            <Link href="/">Evening Dresses Rental</Link>
            <Link href="/">Sandals & Heels Reantal</Link>
            <Link href="/">Bridesmaid Dresses Rental</Link>
            <Link href="/">Accessories Rental</Link>
          </div>
          <div className={styles.socials}>
            <h3>Follow Us</h3>
            <Link href="/">
              <AiFillFacebook className={styles.icon} /> Dolley Boutique
            </Link>
            <Link href="/">
              <AiOutlineInstagram className={styles.icon} /> dolley_boutique
            </Link>
          </div>
          <div className={styles.contact}>
            <h3>Contact Us</h3>
            <p>
              <AiFillPhone className={styles.icon} /> +213700000000
            </p>
            <p>
              <BiLogoGmail className={styles.icon} /> Dolleyboutique@gmail.com
            </p>
            <p>
              <FaLocationDot className={styles.icon} /> ***************
            </p>
          </div>
          <div className={styles.dev}>
            <h3>Developer contact</h3>
          </div>
        </div> */}
        <h3 className={styles.copyright}>
          Copyrights © 2023 all rights are reserved
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
