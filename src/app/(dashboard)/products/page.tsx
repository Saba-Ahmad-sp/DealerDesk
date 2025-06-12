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

const INR_CONVERSION_RATE = 83;
const ITEMS_PER_PAGE = 20;

// Skeleton shimmer card
const SkeletonCard = () => (
  <li className="bg-white rounded-2xl p-4 flex flex-col items-center justify-between shadow-md h-full animate-pulse">
    <div className="w-36 h-38 bg-gray-200 rounded-xl mb-3" />
    <div className="w-full space-y-2">
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
    <div className="mt-3 h-8 w-full bg-gray-200 rounded-xl" />
  </li>
);

const Products = () => {
  const [products, setProducts] = useState<ProductFromAPI[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const API = "https://fakestoreapi.in/api/products?limit=150";
  const { cart, addToCart, increment, decrement } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        
        // Filter products with valid images
        const validateImage = (url: string) => {
          return new Promise<boolean>((resolve) => {
            const img = new window.Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        };

        const productsWithValidImages = await Promise.all(
          data.products.map(async (product: ProductFromAPI) => {
            const isValid = await validateImage(product.image);
            return isValid ? product : null;
          })
        );

        // Remove nulls (invalid images)
        const cleanedProducts = productsWithValidImages.filter(
          (p): p is ProductFromAPI => p !== null
        );

        setProducts(cleanedProducts);
      } catch (error) {
        console.log("error getting the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4">
      {/* Searchbar */}
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

      {/* Products */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          : paginatedProducts.map((item) => {
              const inCart = cart.find((product) => product.id === item.id);
              return (
                <li
                  key={item.id}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center justify-between shadow-md h-full"
                >
                  <div className="relative w-36 h-28 rounded-xl mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 768px) 100px, (max-width: 1200px) 144px, 144px"
                      priority
                    />
                  </div>
                  <div className="mt-3 ml-2 flex flex-col justify-between flex-1 w-full text-gray-800">
                    <p className="text-sm font-medium line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-sm font-bold mt-2">
                      ₹ {Math.floor(item.price * INR_CONVERSION_RATE)}
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
