"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Search } from "lucide-react";

type ProductFromAPI = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Products = () => {
  const [products, setProducts] = useState<ProductFromAPI[]>([]);
  const [search, setSearch] = useState("");
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

  const { cart, addToCart, increment, decrement } = useCart();

   const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="relative max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((item) => {
          const inCart = cart.find((product) => product.id === item.id);
          return (
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

              {inCart ? (
                <div className="mt-3 flex items-center justify-between gap-2 w-full bg-amber-400 rounded-xl py-2 px-3 text-black font-semibold text-xs">
                  <button
                    onClick={() => decrement(item.id)}
                    className="px-2 md:hover:text-red-700 active:text-red-700 transition"
                  >
                    −
                  </button>
                  <span>{inCart.quantity}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="px-2 md:hover:text-green-700 active:text-green-700 transition"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="text-xs mt-3 py-2 px-3 w-full bg-amber-400 rounded-xl font-semibold text-black md:hover:bg-amber-500 active:bg-amber-500 transition"
                >
                  Add to Cart
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
