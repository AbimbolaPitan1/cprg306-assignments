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

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const newItem = { name, quantity, category };

    await addItem(user.uid, newItem);
    await loadItems();

    
    e.currentTarget.reset();
    setName("");
    setQuantity(1);
    setCategory("other");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping List</h1>

      
      <form onSubmit={handleAddItem} style={styles.form}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={styles.inputSmall}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
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

        <button type="submit" style={styles.button}>
          Add Item
        </button>
      </form>

      
      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemDetails}>
              {item.quantity} • {item.category}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  input: {
    flex: "2",
    padding: "8px",
  },
  inputSmall: {
    width: "70px",
    padding: "8px",
  },
  select: {
    padding: "8px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  itemName: {
    fontWeight: "bold",
  },
  itemDetails: {
    color: "#555",
  },
};