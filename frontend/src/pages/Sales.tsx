import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileChartColumn, Upload } from "lucide-react";

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

  const exportToCSV = () => {
    const headers = ["ID", "Produto", "Código", "Quantidade", "Valor Total", "Data"];
    const rows = sales.map(sale => [
      sale.id,
      sale.product,
      sale.product_id,
      sale.quantity,
      sale.total_price.toFixed(2).replace('.', ','),
      new Date(sale.date).toLocaleDateString('pt-BR')
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_vendas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileChartColumn />
              <h1 className="text-3xl font-bold text-gray-800">Relatório de Vendas</h1>
            </div>
            <p className="text-gray-600 mt-2 italic">Visão geral das transações comerciais</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-900 transition"
            >
               <Upload className="size-5" />
              Exportar CSV
            </button>

            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <span className=" text-gray-500">Total de vendas:</span>
              <span className="ml-1 font-semibold text-gray-800">
                {sales.length} {sales.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-900">
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm">ID</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm">Produto</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-center">Código</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-center">Quantidade</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-right">Valor Total</TableHead>
                  <TableHead className="px-6 py-4 text-white font-semibold text-sm text-center">Data</TableHead>
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
                      <TableCell className="px-6 pr-0 py-4 font-medium text-gray-800">{sale.product}</TableCell>
                      <TableCell className="px-2 py-4 text-gray-600 text-center">{sale.product_id}</TableCell>
                      <TableCell className="px-6 py-4 text-center text-gray-700">{sale.quantity}</TableCell>
                      <TableCell className="px-6 py-4 text-right font-medium text-green-600">
                        {sale.total_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center text-gray-500">
                        {new Date(sale.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
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
