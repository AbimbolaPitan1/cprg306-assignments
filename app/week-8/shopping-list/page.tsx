"use client";

import { useState } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import items from "./items.json";

export default function Page() {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemSelect = (item: any) => {
    
    const cleanedName = item.name
      .split(" ")[0]
      .replace(",", "")
      .toLowerCase();

    setSelectedItem(cleanedName);
  };

  return (
    <main className="p-4">
      <h1 className="text-lg font-bold mb-3">Shopping List</h1>

      <ItemList
        items={items}
        onItemSelect={handleItemSelect}
      />

      {selectedItem && (
        <div className="mt-6">
          <MealIdeas ingredient={selectedItem} />
        </div>
      )}
    </main>
  );
}