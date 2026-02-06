"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || name.length < 2) {
      alert("Item name must be at least 2 characters long.");
      return;
    }

    const item = {
      name,
      quantity,
      category,
    };

    console.log(item);

    alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  const isNameInvalid = name.length < 2;
  const isFormInvalid = isNameInvalid;

  return (
    <div className="max-w-md mx-auto mt-10 bg-pink-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            onFocus={() => setNameTouched(false)}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
              isNameInvalid && nameTouched
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
            placeholder="e.g. Apples"
          />
          {isNameInvalid && nameTouched && (
            <p className="text-red-500 text-sm mt-1">
              Item name must be at least 2 characters long.
            </p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

       
        <button
          type="submit"
          disabled={isFormInvalid}
          className="w-full py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}









