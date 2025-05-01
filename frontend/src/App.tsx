import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import UploadCSV from './pages/UploadCSV.tsx';
import Categories from './pages/Categories.tsx';
import Sales from './pages/Sales.tsx';
import AddProduct from './pages/AddProduct.tsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}
