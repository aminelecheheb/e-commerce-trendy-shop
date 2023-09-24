import React, { useState, useEffect } from "react";
import styles from "@/styles/Cart.module.css";
import { useGlobalContext } from "@/context/appContext";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./CartItem";
import ClientInfos from "./ClientInfos";

const Cart = () => {
  const { state, closeCart, closeNav } = useGlobalContext();
  const { isCartOpen, cartItems } = state;
  let totalPrice = 0;
  {
    cartItems.map((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
  }

  useEffect(() => {
    isCartOpen && closeNav();
  }, [isCartOpen]);

  return (
    <aside
      className={`${styles.sidebar} ${styles.sidebar_right} ${
        isCartOpen && styles.show
      }`}
    >
      <AiOutlineClose className={styles.close_cart} onClick={closeCart} />
      <h1 className={styles.boutique_name}>Trendy Shop</h1>
      {state.cartItems.length === 0 && (
        <h2 className={styles.empty}>Your Cart is Empty</h2>
      )}
      <div className={styles.cart_items}>
        {cartItems?.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      {cartItems.length !== 0 && (
        <p className={styles.totalPrice}>Total : {totalPrice}</p>
      )}
      {cartItems.length !== 0 && <ClientInfos />}
    </aside>
  );
};

export default Cart;
