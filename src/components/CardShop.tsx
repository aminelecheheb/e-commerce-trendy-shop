import React from "react";
import Image from "next/image";
import categoryStyles from "@/styles/Category.module.css";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/appContext";
import homeStyles from "@/styles/Home.module.css";
import { log } from "console";

const CardShop = (props: { item: any; homeStyles?: boolean }) => {
  // console.log(props.item);

  let styles: any;
  props.homeStyles ? (styles = homeStyles) : (styles = categoryStyles);

  const { state, removeFromCart, addToCart } = useGlobalContext();
  const { cartItems } = state;
  const router = useRouter();
  const { img, title, startingPrice, id, isNew, oldPrice, color } = props.item;
  // console.log(props.item);

  // console.log(color);

  const ids = cartItems.map((item) => {
    return item.id;
  });

  const cartItem: CartItemType = {
    id,
    title,
    price: startingPrice,
    img: img,
    color,
    cartItemId: new Date().valueOf(),
    quantity: 1,
  };

  return (
    <div className={`${styles.item_container} item_container`}>
      <div className={styles.image_container}>
        {isNew && <span className="new_badge">new</span>}
        <Image
          onClick={() => {
            router.push(`/product/${props.item.id}`);
          }}
          src={process.env.NEXT_PUBLIC_BACKEND + img}
          fill
          alt={title}
          className={styles.img}
        />
      </div>

      <div className={styles.infos}>
        <h4> {title} </h4>
        <p>
          {oldPrice && <span className="stroke">{oldPrice}</span>}
          <span> {startingPrice} DA </span>
        </p>
        {ids.includes(id) ? (
          <button
            onClick={() => removeFromCart(id)}
            className={styles.remove_from_cart}
          >
            Remove From Cart
          </button>
        ) : (
          <button
            className={styles.add_btn}
            onClick={() => addToCart(cartItem)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CardShop;
