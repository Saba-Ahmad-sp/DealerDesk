"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type ProductFromAPI = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Products = () => {
  const [products, setProducts] = useState<ProductFromAPI[]>([]);
  const API = "https://fakestoreapi.com/products";

  const fetchProducts = async () => {
    try {
      const data = await fetch(API);
      const items: ProductFromAPI[] = await data.json();
      setProducts(items);
    } catch (error) {
      console.log("error getting the data", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const { addToCart } = useCart();

  return (
    <div className="p-4">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((item) => (
          <li
            key={item.id}
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-between shadow-md h-full"
          >
            <Image
              src={item.image}
              width={144}
              height={112}
              alt="Product Image"
              className="w-36 h-28 object-contain rounded-xl"
            />
            <div className="mt-3 ml-2 flex flex-col justify-between flex-1 w-full text-gray-800">
              <p className="text-sm font-medium line-clamp-2">{item.title}</p>
              <p className="text-sm font-bold mt-2">
                ₹ {Math.floor(item.price * 83)}
              </p>
            </div>
            <button
              onClick={() => addToCart({ ...item, quantity: 1 })}
              className="text-xs mt-3 py-2 px-3 w-full bg-amber-400 rounded-xl font-semibold text-black md:hover:bg-amber-500 active:bg-amber-500 transition "
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
