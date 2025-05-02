import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package } from "lucide-react"; 

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

useEffect(() => {
  fetch("http://localhost:5000/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data.map((c: any) => c.name)));
}, []);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

   // Filtrar produtos pela categoria selecionada
   const filteredProducts = selectedCategory
   ? products.filter((p) => p.category === selectedCategory)
   : products;

  return (
   <div className="p-8 bg-gray-100 min-h-screen">
    <div className="flex items-center gap-2 mb-2">
      <Package />
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Produtos</h1>
    </div>

      {/* Filtro por categoria */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Filtrar por categoria:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-auto border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-900 text-white uppercase text-sm tracking-wider">
              <TableHead className="p-4">ID</TableHead>
              <TableHead className="p-4">Nome</TableHead>
              <TableHead className="p-4">Marca</TableHead>
              <TableHead className="p-4">Preço</TableHead>
              <TableHead className="p-4">Categoria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((p, idx) => (
              <TableRow
                key={p.id}
                className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
              >
                <TableCell className="p-4 font-medium">{p.id}</TableCell>
                <TableCell className="p-4">{p.name}</TableCell>
                <TableCell className="p-4">{p.brand}</TableCell>
                <TableCell className="p-4 text-green-600 font-semibold">R$ {p.price.toFixed(2)}</TableCell>
                <TableCell className="p-4">{p.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
