import React, { useContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  activeNav: "home",
  isNavOpen: false,
  isCartOpen: false,
  x: 1,
  size: "all",
  page: 1,
  cartItems: [],
  buyerInfos: {
    fullName: "",
    phoneNumber: "",
  },
  categories: [],
  alert: { show: false, msg: "", type: "" },
};

const AppContext = React.createContext<ContextType>({
  state: initialState,
  setActiveNav: () => {},
  toggleNav: () => {},
  closeNav: () => {},
  toggleCart: () => {},
  closeCart: () => {},
  setX: () => {},
  setSize: () => {},
  setPage: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setFullName: () => {},
  setPhoneNumber: () => {},
  setCategories: () => {},
  setSelectedColorInCart: () => {},
  removeUniqueFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setActiveNav = (value: string) => {
    dispatch({ type: "SET_ACTIVE_NAV", payload: value });
  };

  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };

  const closeNav = () => {
    dispatch({ type: "CLOSE_NAV" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const setX = (value: number) => {
    dispatch({ type: "SET_X", payload: value });
  };

  const setSize = (value: string) => {
    dispatch({ type: "SET_SIZE", payload: value });
  };

  const setPage = (value: number) => {
    dispatch({ type: "SET_PAGE", payload: value });
  };

  const addToCart = (item: CartItemType, cartItems: CartItemType[]) => {
    let ids = cartItems.map((cItem: CartItemType) => {
      return cItem.id;
    });

    if (ids.includes(item.id)) {
      const myItems = cartItems.filter((it: CartItemType) => {
        return it.id === item.id;
      });

      const colors = myItems.map((item: CartItemType) => {
        return item.selectedColor;
      });

      for (let i = 0; i < myItems.length; i++) {
        if (myItems[i].selectedColor === item.selectedColor) {
          dispatch({
            type: "INCREASE_QUANTITY",
            payload: myItems[i].cartItemId,
          });
          break;
        }
      }
      if (!colors.includes(item.selectedColor)) {
        dispatch({ type: "ADD_TO_CART", payload: item });
      }
    } else {
      dispatch({ type: "ADD_TO_CART", payload: item });
    }
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const removeUniqueFromCart = (id: number) => {
    dispatch({ type: "REMOVE_UNIQUE_FROM_CART", payload: id });
  };

  // const

  const setFullName = (value: string) => {
    dispatch({ type: "SET_FULL_NAME", payload: value });
  };

  const setPhoneNumber = (value: string) => {
    dispatch({ type: "SET_PHONE_NUMBER", payload: value });
  };

  const setCategories = (value: any) => {
    dispatch({ type: "SET_CATEGORIES", payload: value });
  };

  const setSelectedColorInCart = (id: any, value: any) => {
    dispatch({ type: "SET_SELECTED_COLOR_IN_CART", payload: { id, value } });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setActiveNav,
        toggleNav,
        closeNav,
        setX,
        setSize,
        setPage,
        toggleCart,
        closeCart,
        addToCart,
        removeFromCart,
        setFullName,
        setPhoneNumber,
        setCategories,
        setSelectedColorInCart,
        removeUniqueFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
