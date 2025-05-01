import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
   <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Produtos</h1>

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
            {products.map((p, idx) => (
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
