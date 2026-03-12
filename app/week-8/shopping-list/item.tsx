interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}
export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className="bg-gray-100 bg-blue-500 rounded-full px-6 py-4 mb-3 text-center border cursor-pointer"
    >
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </li>
  );
}