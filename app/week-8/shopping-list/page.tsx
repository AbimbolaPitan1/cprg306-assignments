"use client";

import { useUserAuth } from "../../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import items from "./items.json";

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/week-8"); 
    }
  }, [user, router]);

  
  

  const handleItemSelect = (item: any) => {
    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^a-zA-Z ]/g, "")
      .trim()
      .toLowerCase();

    setSelectedItem(cleanedName);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

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