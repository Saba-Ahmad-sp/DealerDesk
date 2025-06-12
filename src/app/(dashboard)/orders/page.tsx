"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Orders = () => {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const { orders } = useCart();

  const toggleDetails = (id: string) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div className="p-2 md:px-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center mt-4 text-gray-400">No past orders yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <li
                  key={order.id}
                  className="bg-white text-black p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
                      <p>
                        <strong>Order ID:</strong>
                      </p>
                      <p>#{order.id}</p>

                      <p>
                        <strong>Date:</strong>
                      </p>
                      <p>{order.date.split(",")[0]}</p>
                      
                      <p>
                        <strong>Total:</strong>
                      </p>
                      <p>₹ {Math.floor(order.total)}</p>

                      <p>
                        <strong>Items:</strong>
                      </p>
                      <p>
                        {order.items.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        item(s)
                      </p>
                    </div>

                    <button
                      onClick={() => toggleDetails(order.id)}
                      className="text-gray-500 md:hover:text-gray-900 active:text-black text-sm transition"
                    >
                      View Details
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      openOrderId === order.id
                        ? "max-h-96 mt-4 pt-2 border-t"
                        : "max-h-0"
                    } text-sm text-gray-800`}
                  >
                    <div
                      className={`${
                        openOrderId === order.id ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-500`}
                    >
                      <p className="font-bold text-base mb-1">Ordered Items:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.title} x {item.quantity}
                          </li>
                        ))}
                      </ul>
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

export default Orders;
