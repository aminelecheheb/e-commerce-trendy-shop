import React, { useEffect } from "react";
import axios from "axios";
import "../../../axios";
import styles from "@/styles/Category.module.css";
import CardShop from "@/components/CardShop";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import { useGlobalContext } from "@/context/appContext";

const subCategory = (props: { data: any; categories: any }) => {
  const { state, setActiveNav, setCategories } = useGlobalContext();
  const router = useRouter();
  const data = props?.data?.data || [];
  const pageCount = props?.data?.meta?.pagination?.pageCount || 1;
  const { subCategory, page } = router.query;
  // console.log(data);
  useEffect(() => {
    subCategory && router.push(`/subCategories/${subCategory}/${state.page}`);
  }, [state.page]);

  useEffect(() => {
    subCategory && setActiveNav(`categories/${subCategory}`);
    // setPage(1);
  }, [subCategory]);

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

  return (
    <main>
      <div className="container">
        <div className={styles.items}>
          {data.length === 0 && (
            <p className={styles.empty}>
              No items with category : {subCategory}
            </p>
          )}
          {data?.map((i: any) => {
            const { title, price, images, isNew, oldPrice, color } =
              i.attributes;

            let item = {
              id: i.id,
              title,
              startingPrice: price,
              img: images.data[0].attributes.url,
              isNew,
              oldPrice,
              color,
            };
            return <CardShop item={item} key={i.id} />;
          })}
        </div>
        {data.length > 0 && <Pagination pageCount={pageCount} />}
      </div>
    </main>
  );
};

export default subCategory;

export async function getStaticPaths() {
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  let paths: any = [];
  let myPaths: any = [];

  const { data: categories } = await axios.get("/sub-categories");
  let anArr = categories.data.map(async (category: any) => {
    const newCategoryStr = category.attributes.title.replace(/\s/g, "%20");
    const data2 = await axios.get(
      `products?populate=*&pagination[page]=1&pagination[pageSize]=12&filters[sub_categories][title][$eqi]=${newCategoryStr}`
    );

    let nPages = arrayRange(1, data2.data.meta.pagination.pageCount, 1);
    // console.log(nPages);
    return (myPaths = nPages.map((page: any) => {
      return {
        params: {
          subCategory: category.attributes.title,
          page: page.toString(),
        },
      };
    }));
  });

  // console.log(anArr);

  let newPaths = Promise.allSettled(anArr)
    .then((result: any) => {
      return result.map((arr: any) => {
        arr?.value?.length > 0
          ? arr.value.map((iArr: any) => {
              return (paths = [...paths, iArr]);
            })
          : paths;
        return paths;
      });
    })
    .catch((err) => {
      console.log(err);
    });

  await newPaths;

  console.log(paths);

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
  const { subCategory, page } = context.params;
  const pageStr = page.toString();
  const categoryStr = subCategory.toString();
  const newCategory = categoryStr.replace(/\s/g, "%20");

  let path;

  path = `/products?populate[0]=images&populate[1]=color&populate[2]=color.color_img&pagination[page]=${pageStr}&pagination[pageSize]=12&filters[sub_categories][title][$eqi]=${newCategory}`;

  // console.log(path);

  const { data } = await axios.get(path);
  // console.log(data);

  const categories = await axios.get("/categories?populate=sub_categories");

  return {
    props: {
      data: data || { data: [] },
      categories: categories.data.data || [],
    },

    revalidate: 3600,
  };
}
