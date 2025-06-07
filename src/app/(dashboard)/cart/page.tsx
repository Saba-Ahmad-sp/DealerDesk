"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * 83 * item.quantity,
    0
  );

  return (
    <div className="p-2 md:px-6">
      <h2 className="text-2xl text-center font-bold text-gray-300">
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
        <div className="mt-6 text-left pr-4 md:pr-10">
          <p className="text-lg font-semibold text-white">
            Total: ₹ {Math.floor(totalAmount)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
