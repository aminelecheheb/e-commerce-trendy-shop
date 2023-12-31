import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import "../../axios";
import styles from "@/styles/SingleProduct.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import { HiOutlineBackspace } from "react-icons/hi";
import { useGlobalContext } from "@/context/appContext";
import ClientInfos from "@/components/ClientInfos";

export default function ProductPageContainer(props: {
  data: any;
  categories: any;
}) {
  return props?.data && props.categories ? (
    <ProductPage data={props.data} categories={props.categories} />
  ) : (
    <div>Loading</div>
  );
}

const ProductPage = (props: { data: any; categories: any }) => {
  const router = useRouter();
  const { state, addToCart, removeFromCart, setCategories, setActiveNav } =
    useGlobalContext();
  const { cartItems } = state;

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

  useEffect(() => {
    setActiveNav(`categories`);
    // setPage(1);
  }, []);

  const colors = cartItems.map((item: CartItemType) => {
    return item.selectedColor;
  });

  // console.log(props.data);

  let cartIds = cartItems.map((item) => {
    return item.id;
  });

  const [buyNow, setBuyNow] = useState(false);

  const { title, price, description, size, images, color } =
    props?.data?.attributes;

  const [activeColor, setActiveColor] = useState(color[0]?.name || "");
  const [bigImage, setBigImage] = useState(images.data[0].attributes.url || "");

  const cartItem: CartItemType = {
    id: props.data.id,
    cartItemId: new Date().valueOf(),
    title,
    price,
    img: images.data[0].attributes.url,
    color,
    selectedColor: activeColor,
    quantity: 1,
  };

  const myItem = cartItems.filter((item: CartItemType) => {
    return (
      item.id === cartItem.id && item.selectedColor === cartItem.selectedColor
    );
  });

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
              onClick={() => {
                addToCart(cartItem, cartItems);
              }}
            >
              {cartIds.includes(cartItem.id) &&
              colors.includes(cartItem.selectedColor)
                ? `Increase quantity ${cartItem.selectedColor} (${myItem[0]?.quantity})`
                : "Add to cart"}
            </button>
            {cartIds.includes(cartItem.id) && (
              <button
                className={styles.remove_from_cart}
                onClick={() => {
                  removeFromCart(props.data.id);
                }}
              >
                Remove all
              </button>
            )}
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

  const categories = await axios.get("/categories?populate=sub_categories");

  return {
    props: {
      data: data?.data,
      categories: categories.data.data || [],
    },
    revalidate: 3600,
  };
};
