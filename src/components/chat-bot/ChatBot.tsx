"use client";

import { useState, useEffect, useRef } from "react";
import products from "../../utils/data/products";
import ProductItem from "../product-item";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  type?: "text" | "products";
  payload?: any;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
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
  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hi! How can I help you today?",
        timestamp: Date.now(),
        type: "text",
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          💬 Chat
        </button>
      )}

      {/* Chat UI */}
      {isOpen && (
        <div className="chat-container">
          <div className="header-chat">
            <span>🤖 Chat Assistant</span>
            <div className="space-x-2">
              <button
                onClick={resetChat}
                className="reset-btn"
                title="Reset chat"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-sm"
                title="Minimize"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className="message-row">
                {msg.sender === "bot" && <div className="avatar">🤖</div>}
                <div className="message-bubble">
                  {msg.type === "text" ? (
                    msg.text
                  ) : (
                    <>
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="text-sm mb-2">{msg.text}</p>
                        <div className="products-carousel">
                          <div className="space-y-4 mt-2">
                            {msg.payload?.map((product: any) => (
                              <div
                                key={product.id}
                                className="bg-white border rounded-xl p-4 shadow-sm"
                              >
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
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {msg.sender === "user" && <div className="avatar">🧑</div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Chat Assistant..."
            />
            <button onClick={handleUserInput}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
