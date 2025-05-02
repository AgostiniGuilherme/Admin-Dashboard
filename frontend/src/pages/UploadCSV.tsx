import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, UploadCloud } from "lucide-react";
import clsx from "clsx";

const UploadCSV = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (endpoint: string) => {
    if (!file) {
      alert("Selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:5000${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload realizado com sucesso!');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Erro no upload. Verifique o console.');
    }
  };

  const [dragging, setDragging] = useState(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className='flex items-center gap-2 mb-4'>
        <Upload />
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Upload de Arquivos CSV</h1>
      </div>

      <Card className="p-6 space-y-6 shadow-md">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files?.[0] || null);
            setDragging(false);
          }}
          htmlFor="csv-upload"
          className={clsx(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition",
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
          )}
        >
          <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
          <p className="text-gray-700 font-medium">
            {file ? file.name : "Arraste ou clique para enviar um arquivo .csv"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Apenas arquivos com extensão .csv</p>
        </label>

        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex gap-4">
          <Button
            onClick={() => handleUpload("/upload-products-csv")}
            disabled={!file}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Enviar Produtos
          </Button>
          <Button
            onClick={() => handleUpload("/upload-sales-csv")}
            disabled={!file}
            className="bg-red-700 hover:bg-red-900 text-white"
          >
            Enviar Vendas
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UploadCSV;
