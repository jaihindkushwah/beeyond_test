import type { IProduct } from "./product";

export interface ICartItem extends Omit<IProduct, "_id"> {
  productId: string;
  quantity: number;
}
export interface ICart<T = ICartItem> {
  _id: Types.ObjectId;
  customerId: Types.ObjectId;
  items: T[];
  totalPrice?: number;
}

export interface ICartContextType {
  cartData: ICart | null;
  setCartData: React.Dispatch<React.SetStateAction<ICart>>;
  loading: boolean;
  error: string | null;
  handleAddToCart: (cart: ICart) => void;
  handeUpdateCart: (id: string, quantity: number) => void;
  handleRemoveFromCart: (id: string) => void;
  handleClearCart: () => void;
}
