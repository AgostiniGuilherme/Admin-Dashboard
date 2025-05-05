import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { CircleDollarSign, LayoutDashboard, Package } from "lucide-react";

interface Sale {
  date: string;
  quantity: number;
  total_price: number;
}

export default function Dashboard() {
  const [data, setData] = useState<{ month: string; quantity: number; profit: number }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/sales")
      .then((res) => res.json())
      .then((sales: Sale[]) => {
        const monthly = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          quantity: 0,
          profit: 0,
        }));

        for (const sale of sales) {
          const month = new Date(sale.date).getMonth();
          monthly[month].quantity += sale.quantity;
          monthly[month].profit += sale.total_price;
        }

        setData(monthly);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard />
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-md hover:shadow-lg transition bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-600">Quantidade de Vendas</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6 shadow-md hover:shadow-lg transition bg-white">
          <div className="flex items-center gap-2 mb-4">
            <CircleDollarSign className="text-[#34d399]" />
            <h2 className="text-xl font-semibold text-[#34d399]">Receita das Vendas</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
