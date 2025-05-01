import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setError('Formato de dados inválido.');
        }
      })
      .catch(err => {
        console.error('Erro ao carregar categorias:', err);
        setError('Erro ao carregar categorias.');
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5000/products', {
      name,
      price: parseFloat(price),
      brand,
      category_id: categoryId ? parseInt(categoryId) : null
    }).then(() => {
      alert('Produto cadastrado com sucesso!');
      setName('');
      setPrice('');
      setBrand('');
      setCategoryId('');
    }).catch(err => {
      alert('Erro ao cadastrar produto.');
      console.error(err);
    });
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex items-center justify-center">
    <Card className="w-full max-w-xl p-6 shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📝 Cadastrar Novo Produto</h2>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          type="number"
          step="0.01"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <select
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Cadastrar Produto
        </button>
      </form>
    </Card>
  </div>
);
}
