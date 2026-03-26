"use client";

import { useEffect, useMemo, useState } from "react";
import { getItems, addItem } from "../_services/shopping-list-service";
import { auth } from "../_utils/firebase";
import MealIdeas from "./meal-ideas";

type Item = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};

type ViewMode = "name" | "category" | "grouped";

export default function ShoppingListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [viewMode, setViewMode] = useState<ViewMode>("name");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

    const newItem = {
      name,
      quantity,
      category,
    };

    await addItem(user.uid, newItem);
    await loadItems();

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const sortedByName = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const sortedByCategory = useMemo(() => {
    return [...items].sort((a, b) => {
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) return categoryCompare;
      return a.name.localeCompare(b.name);
    });
  }, [items]);

  const groupedItems = useMemo(() => {
    return sortedByCategory.reduce((groups: Record<string, Item[]>, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
      return groups;
    }, {});
  }, [sortedByCategory]);

  const renderItemCard = (item: Item) => (
    <div
      key={item.id}
      style={{
        ...styles.card,
        cursor: "pointer",
        border:
          selectedItem?.id === item.id
            ? "2px solid #d89200"
            : "1px solid #8f8f8f",
      }}
      onClick={() => setSelectedItem(item)}
    >
      <p style={styles.itemName}>{item.name}</p>
      <p style={styles.itemText}>Quantity: {item.quantity}</p>
      <p style={styles.itemText}>Category: {item.category}</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <form onSubmit={handleAddItem} style={styles.form}>
          <label style={styles.label}>Item Name</label>
          <input
            type="text"
            placeholder="e.g. Apples"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            style={styles.input}
          />

          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
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

          <button type="submit" style={styles.addButton}>
            Add Item
          </button>
        </form>

        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={() => setViewMode("name")}
            style={{
              ...styles.sortButton,
              ...(viewMode === "name" ? styles.activeButton : {}),
            }}
          >
            Sort by
            <br />
            Name
          </button>

          <button
            type="button"
            onClick={() => setViewMode("category")}
            style={{
              ...styles.sortButton,
              ...(viewMode === "category" ? styles.activeButton : {}),
            }}
          >
            Sort by
            <br />
            Category
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grouped")}
            style={{
              ...styles.sortButton,
              ...(viewMode === "grouped" ? styles.activeButton : {}),
            }}
          >
            Group by
            <br />
            Category
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {viewMode === "name" &&
            sortedByName.map((item) => renderItemCard(item))}

          {viewMode === "category" &&
            sortedByCategory.map((item) => renderItemCard(item))}

          {viewMode === "grouped" &&
            Object.entries(groupedItems).map(([group, groupItems]) => (
              <div key={group}>
                <h3 style={styles.groupTitle}>{group}</h3>
                {groupItems.map((item) => renderItemCard(item))}
              </div>
            ))}
        </div>

        <div style={{ marginTop: "30px" }}>
          <MealIdeas ingredient={selectedItem ? selectedItem.name : ""} />
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#f3f3f5",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    width: "420px",
    margin: "0 auto",
  },
  form: {
    backgroundColor: "#f7eef1",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    marginTop: "10px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d4d4d4",
    marginBottom: "8px",
    boxSizing: "border-box",
  },
  addButton: {
    width: "100%",
    marginTop: "8px",
    padding: "12px",
    backgroundColor: "#97a0af",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonRow: {
    display: "flex",
    gap: "14px",
    marginBottom: "10px",
  },
  sortButton: {
    flex: 1,
    backgroundColor: "#d9d9de",
    border: "none",
    borderRadius: "4px",
    padding: "12px 8px",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "1.4",
  },
  activeButton: {
    backgroundColor: "#d89200",
    color: "white",
  },
  card: {
    backgroundColor: "#e9e9ec",
    borderRadius: "999px",
    padding: "18px 20px",
    textAlign: "center",
    marginBottom: "14px",
  },
  itemName: {
    fontSize: "28px",
    margin: "0 0 8px 0",
    fontWeight: 500,
  },
  itemText: {
    margin: "4px 0",
    fontSize: "16px",
  },
  groupTitle: {
    textTransform: "capitalize",
    margin: "18px 0 10px 6px",
  },
};