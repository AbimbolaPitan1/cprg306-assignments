"use client";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: Item[];
  onItemSelect: (item: Item) => void;
};

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemSelect(item)}
          className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >
          <p className="text-sm font-semibold text-gray-800">
            {item.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Qty: {item.quantity}
          </p>

          <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      ))}
    </div>
  );
}