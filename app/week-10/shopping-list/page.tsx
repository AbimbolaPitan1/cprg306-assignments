"use client";

import { useEffect, useState } from "react";
import { getItems, addItem } from "../_services/shopping-list-service";
import { auth } from "../_utils/firebase";

type Item = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ShoppingListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("other");

   
  const loadItems = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const items = await getItems(user.uid);
    setItems(items);
  };

  
  useEffect(() => {
    loadItems();
  }, []);

  
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const newItem = {
      name,
      quantity,
      category,
    };

    const id = await addItem(user.uid, newItem);

    setItems([...items, { id, ...newItem }]);

  
    setName("");
    setQuantity(1);
    setCategory("other");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping List</h1>

      
      <form onSubmit={handleAddItem} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

        <button type="submit">Add Item</button>
      </form>

      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}