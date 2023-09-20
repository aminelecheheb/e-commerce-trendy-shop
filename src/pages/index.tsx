import React, { useEffect } from "react";
import axios from "axios";
import "../axios";
import { useGlobalContext } from "@/context/appContext";

const index = (props: { categories: any }) => {
  const { state, setCategories, setActiveNav } = useGlobalContext();
  // console.log(props.categories);
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
  // console.log(myCategories);

  useEffect(() => {
    setCategories(myCategories);
  }, []);

  useEffect(() => {
    setActiveNav("home");
  }, []);
  return (
    <main>
      <div className="container">
        <h1>home page</h1>
      </div>
    </main>
  );
};

export default index;

export async function getStaticProps() {
  const categories = await axios.get("/categories?populate=sub_categories");

  return {
    props: {
      categories: categories.data.data || [],
    },
    revalidate: 3600,
  };
}
