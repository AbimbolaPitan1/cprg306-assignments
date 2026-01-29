import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-100">
        Shopping List
      </h1>

      <ItemList />
    </main>
  );
}
