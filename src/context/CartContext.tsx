"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Children,
} from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increment = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

const decrement = (productId: number) => {
  setCart(prevCart =>
    prevCart
      .map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
};

const removeFromCart = (id: number) => {
  setCart(prevCart => prevCart.filter(item => item.id !== id));
};
  
  return (
    <CartContext.Provider value={{cart, addToCart, increment, decrement, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
};

export const useCart = () => {
  const context = useContext(CartContext);
  if(!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
