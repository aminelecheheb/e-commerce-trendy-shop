import React from "react";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "@/context/appContext";

const CartItem = (props: { item: CartItemType }) => {
  const { state, removeUniqueFromCart, setSelectedColorInCart } =
    useGlobalContext();
  const { title, img, price, id, color, cartItemId } = props.item;

  // console.log(color);

  return (
    <div className={styles.item}>
      <div className={styles.img_container}>
        <Image src={process.env.NEXT_PUBLIC_BACKEND + img} fill alt={title} />
      </div>
      <div className={styles.cart_infos_container}>
        <div className={styles.flex}>
          <p>{title}</p>
          <p>{price}DA</p>
        </div>
        {color?.length > 0 && (
          <div className={styles.colors}>
            {color.map((co: any) => {
              return (
                <p
                  onClick={() => {
                    setSelectedColorInCart(cartItemId, co.name);
                  }}
                  className={`${styles.pill} ${
                    co.name === props.item.selectedColor && styles.color_active
                  }`}
                >
                  {co.name}
                </p>
              );
            })}
          </div>
        )}
      </div>

      <AiOutlineClose
        className={styles.remove_item}
        onClick={() => removeUniqueFromCart(cartItemId)}
      />
    </div>
  );
};

export default CartItem;
