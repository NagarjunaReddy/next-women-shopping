"use client";

import { useState, useEffect, useRef } from "react";
import products from "../../utils/data/products";
import SwiperCore, { EffectFlip, Navigation } from "swiper";
import ProductItem from "../product-item";
import type { ProductTypeList } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

type ProductsCarouselType = {
  products: ProductTypeList[];
};
SwiperCore.use([EffectFlip, Navigation]);
interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  type?: "text" | "products";
  payload?: any;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! How can I help you today?",
      timestamp: Date.now(),
      type: "text",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleUserInput = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      sender: "user",
      text: input,
      timestamp: Date.now(),
      type: "text",
    };

    setMessages((prev) => [...prev, newUserMessage]);

    const lowerInput = input.toLowerCase();
    setInput("");
    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerInput) ||
        p.category.toLowerCase().includes(lowerInput)
    );

    let botMessage: Message = {
      sender: "bot",
      text: "I'm not sure how to help with that.",
      timestamp: Date.now(),
      type: "text",
    };
    console.log("products", products);
    console.log("lowerInput", lowerInput);
    console.log("filteredProducts", matchedProducts);

    if (matchedProducts.length > 0) {
      botMessage = {
        sender: "bot",
        text: "Here are some matching products:",
        timestamp: Date.now(),
        type: "products",
        payload: matchedProducts,
      };
    } else {
      botMessage = {
        sender: "bot",
        text: "Sorry, I couldn't find any products for that.",
        timestamp: Date.now(),
        type: "text",
      };
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white p-4 font-semibold">
        💬 Chat Assistant
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto h-80 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`max-w-[75%]`}>
              {msg.type === "text" ? (
                <div
                  className={`rounded-xl px-4 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white text-right"
                      : "bg-gray-200 text-gray-800 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-2">
                  <p className="text-sm mb-2">{msg.text}</p>
                  <div className="products-carousel">
                    <Swiper
                      spaceBetween={spaceBetween}
                      loop
                      centeredSlides={centeredSlides}
                      watchOverflow
                      slidesPerView={slidesPerView}
                      className="swiper-wrapper"
                    >
                      {msg.payload?.map((product: any) => (
                        <SwiperSlide key={product.id}>
                          <ProductItem
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            color={product.color}
                            discount={product.discount}
                            currentPrice={product.currentPrice}
                            key={product.id}
                            images={product.images}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex border-t border-gray-200 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about products..."
          className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
          style={{ width: "calc(100% - 100px)", padding: '10px' } }
        />
        <button
          onClick={handleUserInput}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
      <div className="flex justify-end p-2 bg-white border-t border-gray-100">
  <button
    onClick={() =>
      setMessages([
        {
          sender: "bot",
          text: "Hi! How can I help you today?",
          timestamp: Date.now(),
          type: "text",
        },
      ])
    }
    className="text-sm text-gray-500 hover:text-red-600 transition"
  >
    🗑️ Clear Chat
  </button>
</div>
    </div>
  );
}
