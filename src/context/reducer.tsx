const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_ACTIVE_NAV":
      return {
        ...state,
        activeNav: action.payload,
      };

    case "TOGGLE_NAV":
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };

    case "CLOSE_NAV":
      return {
        ...state,
        isNavOpen: false,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };

    case "SET_X":
      return {
        ...state,
        x: action.payload,
      };

    case "SET_SIZE":
      return {
        ...state,
        size: action.payload,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "REMOVE_FROM_CART":
      let newItems = state.cartItems.filter((item) => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        cartItems: newItems,
      };

    case "REMOVE_UNIQUE_FROM_CART":
      let tempItems = state.cartItems.filter((item) => {
        return item.cartItemId !== action.payload;
      });
      return {
        ...state,
        cartItems: tempItems,
      };

    case "SET_FULL_NAME":
      return {
        ...state,
        buyerInfos: {
          ...state.buyerInfos,
          fullName: action.payload,
        },
      };

    case "SET_PHONE_NUMBER":
      return {
        ...state,
        buyerInfos: {
          ...state.buyerInfos,
          phoneNumber: action.payload,
        },
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "SET_SELECTED_COLOR_IN_CART":
      let tempCartItems: any;
      tempCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, selectedColor: action.payload.value };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cartItems: tempCartItems,
      };

    default:
      return state;
  }
};

export default reducer;
