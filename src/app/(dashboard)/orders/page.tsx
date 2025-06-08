"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Orders = () => {
  const { orders } = useCart();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div className="p-4 md:p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">No past orders yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <li
                  key={order.id}
                  className="bg-gray-400 text-black p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p>
                        <strong>Order #:</strong> #{order.id}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.date).toISOString().slice(0, 10)}
                      </p>
                      <p>
                        <strong>Total:</strong> ₹ {Math.floor(order.total)}
                      </p>
                      <p>
                        <strong>Items:</strong> {order.items.length}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleDetails(order.id)}
                      className="text-gray-800 text-sm"
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
