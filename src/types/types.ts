type StateType = {
  activeNav: string;
  isNavOpen: boolean;
  isCartOpen: boolean;
  x: number;
  size: string;
  page: number;
  cartItems: CartItemType[];
  buyerInfos: {
    fullName: string;
    phoneNumber: string;
  };
  categories: any;
};

type ActionType = {
  type: string;
  payload?: any;
};

type ContextType = {
  state: StateType;
  setActiveNav: (value: string) => void;
  toggleNav: () => void;
  closeNav: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  setX: (value: number) => void;
  setSize: (value: string) => void;
  setPage: (value: number) => void;
  addToCart: (item: CartItemType, cartItems: any) => void;
  removeFromCart: (id: number) => void;
  setFullName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setCategories: (value: string) => void;
  setSelectedColorInCart: (id: any, value: any) => void;
  removeUniqueFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

type ItemType = {
  id: number;
  img: any;
  title: string;
  startingPrice: number;
  isNew?: boolean;
};

type CartItemType = {
  id: number;
  cartItemId: number;
  img: any;
  title: string;
  price: number;
  color: any;
  selectedColor?: any;
  quantity: number;
};
