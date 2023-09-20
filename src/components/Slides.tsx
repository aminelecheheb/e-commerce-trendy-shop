import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { register } from "swiper/element/bundle";
import { useGlobalContext } from "@/context/appContext";
import Product from "./CardShop";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = (props: { data: ItemType[] }) => {
  console.log(props.data);

  const { state, setX } = useGlobalContext();
  const { x } = state;
  const swiperRef = useRef(null);

  useEffect(() => {
    register();

    window.innerWidth > 500
      ? setX(window.innerWidth / 400)
      : setX(window.innerWidth / 300);
  }, []);

  const checkX = () => {
    window.innerWidth > 500
      ? setX(window.innerWidth / 400)
      : setX(window.innerWidth / 300);
  };

  useEffect(() => {
    window.addEventListener("resize", checkX);
    return () => {
      window.removeEventListener("resize", checkX);
    };
  });

  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      spaceBetween={20}
      slidesPerView={x}
      ref={swiperRef}
      initial-slide={0}
      free-mode="true"
      navigation={true}
      freeMode={true}
    >
      {props.data.map((item) => {
        return (
          <SwiperSlide>
            <Product item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
