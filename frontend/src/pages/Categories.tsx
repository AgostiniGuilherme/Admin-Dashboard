  import { useEffect, useState } from "react";
  import { Card } from "@/components/ui/card";
  import { Tag, FolderClosed } from "lucide-react";

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
        <div className="flex items-center gap-2 mb-4">
          <FolderClosed className="size-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Categorias</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((c) => (
            <Card
              key={c.id}
              className=" p-4 flex items-center gap-1 shadow-md hover:shadow-lg transition bg-white rounded-2xl"
            >
              <Tag className="text-blue-600 w-8 h-8 mb-3" />
              <div className="flex flex-col items-center mb-3">
                <p className="text-lg font-semibold text-gray-800">{c.name}</p>
                <p className="text-sm text-gray-500">ID: {c.id}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }