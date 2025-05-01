import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BadgePlus } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 Categorias</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Card
            key={c.id}
            className="p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition"
          >
            <BadgePlus className="text-blue-600 w-6 h-6" />
            <div>
              <p className="text-lg font-semibold text-gray-800">{c.name}</p>
              <p className="text-sm text-gray-500">ID: {c.id}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}