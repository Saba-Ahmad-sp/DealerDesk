"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const Cart = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { cart, increment, decrement, removeFromCart, placeOrder } = useCart();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * 83 * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    placeOrder();
    toast.success("Order placed successfully!", {
      style: {
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        marginBottom: "40px"
      },
      iconTheme: {
        primary: "#10B981",
        secondary: "#fff",
      },
    });
  };

  return (
    <div className="p-2 md:px-6">
      <h2 className="text-3xl text-center font-bold text-gray-300">
        Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center mt-4 text-gray-400">There is no items in your Cart add some.</p>
      ) : (<>
      {cart.length > 0 && (
        <div className="mt-6 text-left   flex justify-between">
          <p className="text-sm  md:text-lg font-semibold text-white  py-1 rounded-full">
            Total Amount: ₹ {Math.floor(totalAmount)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className=" text-sm md:text-lg font-semibold text-black bg-amber-500 md:hover:bg-amber-600 active:bg-amber-600 transition cursor-pointer px-4 py-1 rounded-full"
          >
            Place Order
          </button>
        </div>
      )}
      <ul className="mt-8 space-y-2">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-lg "
              />
              <div className="space-y-3">
                <p className="font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-sm font-semibold">
                  ₹ {Math.floor(item.price * 83)}{" "}
                  {item.quantity > 1 && (
                    <>
                      {" "}
                      × {item.quantity} = ₹{" "}
                      {Math.floor(item.price * 83 * item.quantity)}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 text-xs w-20 pl-1 ">
              <button
                onClick={() => removeFromCart(item.id)}
                className=" text-xs py-1 px-3 rounded-full bg-red-300 w-full text-black md:hover:bg-red-500  transition active:bg-red-500"
              >
                Remove
              </button>
              <div className="flex items-center justify-between bg-amber-300 rounded-full w-full text-black">
                <button
                  onClick={() => decrement(item.id)}
                  className=" w-6 h-6 text-center font-bold md:hover:text-red-700 active:text-red-700 transition"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="w-6 h-6 text-center md:hover:text-green-700 active:text-green-700 transition"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </>
    )}
    </div>
  );
};

export default Cart;
