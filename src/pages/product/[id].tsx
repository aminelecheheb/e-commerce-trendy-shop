import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "../../axios";
import styles from "@/styles/SingleProduct.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import { HiOutlineBackspace } from "react-icons/hi";
import { useGlobalContext } from "@/context/appContext";
import ClientInfos from "@/components/ClientInfos";

export default function ProductPageContainer(props: { data: any }) {
  return props?.data ? <ProductPage data={props.data} /> : <div>Loading</div>;
}

const ProductPage = (props: { data: any }) => {
  const router = useRouter();
  const { state, addToCart, removeFromCart } = useGlobalContext();
  const { cartItems } = state;

  // console.log(props.data);
  const [activeColor, setActiveColor] = useState("");

  let cartIds = cartItems.map((item) => {
    return item.id;
  });

  const [buyNow, setBuyNow] = useState(false);

  const { title, price, description, size, images, color } =
    props?.data?.attributes;
  const [bigImage, setBigImage] = useState(images.data[0].attributes.url || "");

  const cartItem: CartItemType = {
    id: props.data.id,
    cartItemId: new Date().valueOf(),
    title,
    price,
    img: images.data[0].attributes.url,
    color,
    selectedColor: activeColor,
  };

  return (
    <main className={styles.wrapper}>
      <div className="container">
        <p
          className={styles.mb}
          onClick={() => {
            router.back();
          }}
        >
          <HiOutlineBackspace className={styles.exit} /> Go Back
        </p>
        <div className={styles.flex}>
          <div className={styles.images}>
            <div className={styles.big_img}>
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND + bigImage}
                fill
                alt="product"
                className={styles.img}
              />
            </div>
            <div className={styles.small_imgs}>
              {images.data.map((image: any) => {
                return (
                  <div
                    key={image.id}
                    className={`${styles.small_img} ${
                      image.attributes.url === bigImage && styles.active
                    }`}
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BACKEND + image.attributes.url
                      }
                      fill
                      alt="image"
                      className={styles.img}
                      onClick={() => {
                        setBigImage(image.attributes.url);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.infos}>
            <h1 className={styles.title}>{title}</h1>
            {size && (
              <h3>
                Size : <span> {size} </span>
              </h3>
            )}
            <ReactMarkdown>{description}</ReactMarkdown>
            <h2>Price : {price} DA</h2>
            <div className="variants_flex">
              {color?.length > 0 &&
                color.map((color: any) => {
                  // console.log(color);
                  return (
                    <div className={`variant_container`}>
                      <div
                        className={`img_container ${
                          color?.name === activeColor && `active_variant`
                        }`}
                      >
                        {color?.color_img?.data?.attributes?.url && (
                          <Image
                            fill
                            src={
                              process.env.NEXT_PUBLIC_BACKEND +
                              color.color_img.data.attributes.url
                            }
                            alt={color.name}
                            onClick={() => {
                              setBigImage(color.color_img.data.attributes.url);
                              setActiveColor(color.name);
                            }}
                          />
                        )}
                      </div>
                      <p>{color.name}</p>
                    </div>
                  );
                })}
            </div>
            {/* {cartIds.includes(props.data.id) ? (
              <button
                onClick={() => removeFromCart(props.data.id)}
                className={styles.remove_from_cart}
              >
                Remove From cart
              </button>
            ) : (
              <button
                className={styles.add_btn}
                onClick={() => addToCart(cartItem)}
              >
                Add to Cart
              </button>
            )} */}
            <button
              className={styles.add_btn}
              onClick={() => addToCart(cartItem)}
            >
              Add to Cart
            </button>
            {buyNow ? (
              <button
                className={styles.remove_from_cart}
                onClick={() => setBuyNow(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className={styles.book_btn}
                onClick={() => setBuyNow(true)}
              >
                Order Now
              </button>
            )}
            {buyNow && (
              <div>
                <ClientInfos />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get("/products");
  // console.log(data);

  const paths = data.data.map((product: any) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  console.log(paths);

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id.toString();
  const { data } = await axios.get(
    "/products/" +
      id +
      "?populate[0]=images&populate[1]=color&populate[2]=color.color_img"
  );

  return {
    props: data,
    revalidate: 3600,
  };
};
