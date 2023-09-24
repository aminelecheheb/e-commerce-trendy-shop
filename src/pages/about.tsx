import { useGlobalContext } from "@/context/appContext";
import React, { useEffect } from "react";
import styles from "@/styles/About.module.css";
import Deco from "@/components/Deco";
import axios from "axios";
import "../axios";

const about = (props: { categories: any }) => {
  const { state, setFullName, setPhoneNumber, setActiveNav, setCategories } =
    useGlobalContext();
  const { fullName, phoneNumber } = state.buyerInfos;

  let myCategories: any = [];
  props?.categories?.map((category: any) => {
    myCategories = [
      ...myCategories,
      {
        category: category?.attributes?.title || "",
        subCategory:
          category?.attributes?.sub_categories?.data?.map((subC: any) => {
            return subC.attributes.title;
          }) || [],
      },
    ];
  });

  useEffect(() => {
    setCategories(myCategories);
  }, []);

  const handleFullName = (e: any) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };
  useEffect(() => {
    setActiveNav("about");
  }, []);
  return (
    <main className={`about ${styles.about}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <Deco />
          <h1>About Page</h1>
          <p>
            <span className={styles.dolley}>Trendy Shop</span>, a rental store
            for wedding dresses, traditional Algerian outfits, sublime evening
            dresses and all traditional and modern accessories and jewelry,
            sales service and also available for certain items.
          </p>
          <h1>How it's works?</h1>
          <ul>
            <li>
              Make inquiries and book an appointment online or visit our store.
            </li>
            <li>
              When taking the dresses, personal information must be left with
              the payment of a monetary value that will be refunded when the
              garment is returned in its good condition.
            </li>
            <li>
              The rental price includes the dress, accessories and laundry
              service.
            </li>
            <li>In case of damage to the dress, compensation must be paid.</li>
            <li>
              <span className={styles.dolley}>Trendy Shop </span>welcomes you.
              Book an appointment now from here!
            </li>
          </ul>
        </div>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Enter your fullname"
            value={fullName}
            onChange={handleFullName}
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
          <button>Send</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="55"
            viewBox="0 0 56 55"
            fill="none"
          >
            <path
              d="M10.4999 16.3281C10.4999 12.9093 11.8828 9.63054 14.3442 7.21308C16.8056 4.79562 20.144 3.4375 23.6249 3.4375C27.1059 3.4375 30.4443 4.79562 32.9057 7.21308C35.3671 9.63054 36.7499 12.9093 36.7499 16.3281C36.7499 16.784 36.5656 17.2211 36.2374 17.5435C35.9092 17.8658 35.4641 18.0469 34.9999 18.0469C34.5358 18.0469 34.0907 17.8658 33.7625 17.5435C33.4343 17.2211 33.2499 16.784 33.2499 16.3281C33.2499 13.821 32.2359 11.4166 30.4309 9.64376C28.6258 7.87095 26.1777 6.875 23.6249 6.875C21.0722 6.875 18.6241 7.87095 16.819 9.64376C15.014 11.4166 13.9999 13.821 13.9999 16.3281C13.9999 16.784 13.8156 17.2211 13.4874 17.5435C13.1592 17.8658 12.7141 18.0469 12.2499 18.0469C11.7858 18.0469 11.3407 17.8658 11.0125 17.5435C10.6843 17.2211 10.4999 16.784 10.4999 16.3281ZM41.1249 25.7812C40.1041 25.7801 39.0993 26.0306 38.2024 26.5096C37.9345 25.6951 37.4926 24.9462 36.9063 24.3128C36.3201 23.6795 35.603 23.1763 34.8029 22.8369C34.0029 22.4974 33.1383 22.3296 32.2669 22.3446C31.3955 22.3596 30.5374 22.5571 29.7499 22.9238V16.3281C29.7499 14.7327 29.1046 13.2026 27.956 12.0744C26.8073 10.9463 25.2494 10.3125 23.6249 10.3125C22.0005 10.3125 20.4426 10.9463 19.2939 12.0744C18.1453 13.2026 17.4999 14.7327 17.4999 16.3281V33.5156L16.6643 32.1986C15.8472 30.8194 14.5056 29.8155 12.9348 29.4078C11.364 29 9.69266 29.2218 8.28838 30.0244C6.8841 30.827 5.86195 32.1446 5.44679 33.6873C5.03164 35.23 5.25748 36.8716 6.07463 38.2508L12.4884 48.993C12.5959 49.2022 12.7459 49.3876 12.9292 49.5378C13.1124 49.688 13.3249 49.7998 13.5537 49.8663C13.7826 49.9328 14.0228 49.9527 14.2598 49.9247C14.4967 49.8966 14.7253 49.8213 14.9315 49.7033C15.1377 49.5853 15.3171 49.4272 15.4588 49.2386C15.6005 49.05 15.7014 48.8349 15.7553 48.6066C15.8092 48.3782 15.815 48.1415 15.7723 47.9109C15.7296 47.6803 15.6394 47.4607 15.5071 47.2656L9.09994 36.5234C8.92006 36.23 8.80152 35.9043 8.75124 35.5653C8.70096 35.2264 8.71995 34.881 8.80711 34.5494C8.89426 34.2177 9.04783 33.9064 9.25885 33.6337C9.46986 33.361 9.73409 33.1323 10.0361 32.9611C10.3381 32.7898 10.6718 32.6793 11.0178 32.6361C11.3638 32.5929 11.715 32.6179 12.0511 32.7095C12.3871 32.8011 12.7012 32.9576 12.975 33.1698C13.2487 33.382 13.4767 33.6456 13.6456 33.9453L13.6762 33.9947L17.7624 40.44C17.9631 40.758 18.2638 41.003 18.6191 41.1378C18.9743 41.2727 19.3647 41.29 19.7309 41.1872C20.0971 41.0844 20.4191 40.8671 20.6481 40.5682C20.8772 40.2694 21.0007 39.9053 20.9999 39.5312V16.3281C20.9999 15.6444 21.2765 14.9886 21.7688 14.5051C22.2611 14.0216 22.9288 13.75 23.6249 13.75C24.3211 13.75 24.9888 14.0216 25.4811 14.5051C25.9734 14.9886 26.2499 15.6444 26.2499 16.3281V30.9375C26.2499 31.3933 26.4343 31.8305 26.7625 32.1528C27.0907 32.4752 27.5358 32.6562 27.9999 32.6562C28.4641 32.6562 28.9092 32.4752 29.2374 32.1528C29.5656 31.8305 29.7499 31.3933 29.7499 30.9375V28.3594C29.7499 27.6756 30.0265 27.0199 30.5188 26.5364C31.0111 26.0529 31.6788 25.7812 32.3749 25.7812C33.0711 25.7812 33.7388 26.0529 34.2311 26.5364C34.7234 27.0199 34.9999 27.6756 34.9999 28.3594V32.6562C34.9999 33.1121 35.1843 33.5493 35.5125 33.8716C35.8407 34.1939 36.2858 34.375 36.7499 34.375C37.2141 34.375 37.6592 34.1939 37.9874 33.8716C38.3156 33.5493 38.4999 33.1121 38.4999 32.6562V31.7969C38.4999 31.1131 38.7765 30.4574 39.2688 29.9739C39.7611 29.4904 40.4288 29.2188 41.1249 29.2188C41.8211 29.2188 42.4888 29.4904 42.9811 29.9739C43.4734 30.4574 43.7499 31.1131 43.7499 31.7969V39.5312C43.7499 44.174 42.1968 47.3301 42.1837 47.3559C41.9764 47.7636 41.9424 48.2354 42.0893 48.6677C42.2361 49.1 42.5518 49.4574 42.9668 49.6611C43.2096 49.7817 43.4779 49.8443 43.7499 49.8438C44.0751 49.844 44.3938 49.7553 44.6705 49.5875C44.9471 49.4198 45.1707 49.1797 45.3162 48.8941C45.3971 48.7373 47.2521 45.027 47.2521 39.5312V31.7969C47.2521 31.0067 47.0936 30.2243 46.7857 29.4943C46.4777 28.7643 46.0264 28.1011 45.4574 27.5424C44.8884 26.9838 44.2129 26.5407 43.4696 26.2385C42.7262 25.9364 41.9295 25.781 41.1249 25.7812Z"
              fill="#AE6526"
            />
          </svg>
        </form>
      </div>
    </main>
  );
};

export default about;

export async function getStaticProps() {
  const categories = await axios.get("/categories?populate=sub_categories");

  return {
    props: {
      categories: categories.data.data || [],
    },
    revalidate: 3600,
  };
}
