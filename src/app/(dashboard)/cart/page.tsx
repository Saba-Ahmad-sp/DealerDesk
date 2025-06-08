"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart, placeOrder } = useCart();
  const [success, setSuccess] = useState(false);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * 83 * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    placeOrder();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-2 md:px-6">
      <h2 className="text-3xl text-center font-bold text-gray-300">
        Shopping Cart
      </h2>
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
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => removeFromCart(item.id)}
                className=" text-xs py-1 px-3 rounded-full bg-red-600 text-white md:hover:bg-red-800 transition"
              >
                Remove
              </button>
              <div className="flex items-center gap-2 bg-gray-400 rounded-full text-black">
                <button
                  onClick={() => decrement(item.id)}
                  className=" w-6 h-6 text-center font-bold"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="w-6 h-6 text-center"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <div className="mt-6 text-left   flex justify-between">
          <p className="text-sm  md:text-lg font-semibold text-white  py-1 rounded-full">
            Total Amount: ₹ {Math.floor(totalAmount)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className=" text-sm md:text-lg font-semibold text-white bg-green-500 md:hover:bg-green-600 active:bg-green-800 transition cursor-pointer px-4 py-1 rounded-full"
          >
            Place Order
          </button>
        </div>
      )}
      {success && (
        <p className="text-green-500 font-semibold mt-8 transition text-center ">
          Order placed successfully!
        </p>
      )}
    </div>
  );
};

export default Cart;
