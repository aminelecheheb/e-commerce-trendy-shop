import React from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const cardLanding = (props: { item: any; clickable?: boolean }) => {
  const router = useRouter();
  const { img, title, startingPrice, id } = props.item;
  return (
    <div className={`${styles.item_container} item_container`}>
      {props.clickable ? (
        <Image
          src={img}
          fill
          alt={title}
          className={`${styles.img} ${styles.clickable}`}
          onClick={() => {
            router.push(`/product/${props.item.id}`);
          }}
        />
      ) : (
        <Image src={img} fill alt={title} className={styles.img} />
      )}
      <div className={styles.infos}>
        <h3> {title} </h3>
        <p>
          Starting from <span> {startingPrice} DA </span>
        </p>
      </div>
    </div>
  );
};

export default cardLanding;
