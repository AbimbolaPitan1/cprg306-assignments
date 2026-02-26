"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}
export default function Page() {
  const [items, setItems] = useState<Item[]>(itemsData);

  const handleAddItem = (newItem: Omit<Item, "id">) => {
    const itemWithId: Item = {
      id: crypto.randomUUID(),
      ...newItem,
    };

    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Shopping List
      </h1>

      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}


