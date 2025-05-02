import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  Tag,
  CopyPlus,
  Upload,
  CircleArrowRight,
  CircleArrowLeft,
  FileChartColumn,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Relatório de Vendas", path: "/sales", icon: FileChartColumn },
  { name: "Produtos", path: "/products", icon: Package },
  { name: "Novo Produto", path: "/add-product", icon: PackagePlus },
  { name: "Categorias", path: "/categories", icon: Tag },
  { name: "Nova Categoria", path: "/add-category", icon: CopyPlus },
  { name: "Importar CSV", path: "/upload", icon: Upload },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={clsx(
          "bg-gray-900 text-white flex flex-col py-4 transition-all duration-300",
          collapsed ? "w-16 items-center" : "w-64"
        )}
      >
        <div className="flex items-center justify-between px-4 mb-6">
          {!collapsed && <h1 className="text-xl font-bold">Painel Admin</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <CircleArrowRight/> : <CircleArrowLeft/>}
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition",
                location.pathname === path && "bg-gray-800 font-semibold"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
