import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Sale {
  id: number;
  product_id: number;
  product: string;
  quantity: number;
  total_price: number;
  date: string; // formato ISO: "2024-07-30"
}

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/sales")
      .then((res) => res.json())
      .then((data) => setSales(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Relatório de Vendas</h1>
            <p className="text-gray-600 mt-2">Visão geral das transações comerciais</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-500">Total de vendas:</span>
            <span className="ml-2 font-semibold text-gray-800">
              {sales.length} {sales.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-900">
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm">ID</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm">Produto</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm">Código</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-center">Quantidade</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-right">Valor Total</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                      Nenhuma venda encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  sales.map((sale) => (
                    <TableRow key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <TableCell className="px-6 py-4 font-medium text-gray-900">{sale.id}</TableCell>
                      <TableCell className="px-6 py-4 font-medium text-gray-800">{sale.product}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-600">{sale.product_id}</TableCell>
                      <TableCell className="px-6 py-4 text-center text-gray-700">{sale.quantity}</TableCell>
                      <TableCell className="px-6 py-4 text-right font-medium text-green-600">
                        {sale.total_price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right text-gray-500">
                        {new Date(sale.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
}
