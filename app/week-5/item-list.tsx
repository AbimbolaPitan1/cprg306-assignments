"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [items, setItems] = useState(itemsData);
  const [sortBy, setSortBy] = useState("name");

  
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

 
  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, typeof items>);

  
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="max-w-md mx-auto">
      
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category"
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("grouped")}
          className={`px-4 py-2 rounded ${
            sortBy === "grouped"
              ? "bg-pink-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Group by Category
        </button>
      </div>

      
      {sortBy !== "grouped" ? (
        <ul>
          {sortedItems.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <div>
          {sortedCategories.map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-bold capitalize mb-2">
                {category}
              </h2>
              <ul>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item key={item.id} {...item} />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



