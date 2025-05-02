import { useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, CopyPlus } from "lucide-react";

export default function AddCategory() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("O nome da categoria não pode estar vazio.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/categories', { name });
      setSuccess(true);
      setName('');
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar categoria.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-xl p-6 shadow-md space-y-6 bg-white">
        <div className='flex items-center gap-2 mb-0'>
          <CopyPlus />
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Nova Categoria</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-100 p-2 rounded-md">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm">Categoria cadastrada com sucesso!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-900 transition-colors font-semibold"
          >
            Cadastrar Categoria
          </button>
        </form>
      </Card>
    </div>
  );
}
