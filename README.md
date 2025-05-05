# Admin Dashboard

O Admin Dashboard é um *Sistema de Gerenciamento de Produtos, Categorias e Vendas* para otimizar cadastro, visualização e análise de produtos e vendas de forma eficiente. Com uma interface intuitiva e responsiva, a solução permite o cadastro manual de produtos e categorias, além de importação de planilhas via arquivos CSV.

A aplicação oferece dashboards interativos com gráficos dinâmicos de lucro e volume de vendas, permitindo visualização temporal para acompanhamento de desempenho. Recursos avançados incluem filtros por categoria, edição direta de preços e valores de vendas, e geração de relatórios exportáveis em CSV. 

A arquitetura foi projetada para fornecer insights acionáveis através de painéis visuais simplificados, apoiando a tomada de decisão estratégica.

---


## 📦 Tecnologias Utilizadas

- **Frontend:** React, Vite, TailwindCSS, React Router DOM, shadcn/ui
- **Backend:** Flask, SQLAlchemy, Pandas
- **Banco de Dados:** SQLite


---

🛠️ **Funcionalidades**

- Cadastro manual de produtos e categorias
- Importação e exportação de dados via arquivos CSV
- Dashboards interativos com gráficos dinâmicos de vendas e lucro
- Filtros por categoria para facilitar a busca e visualização
- Edição de preços e valores de vendas de forma dinâmica
- Geração de relatórios exportáveis em CSV
- Visualização de dados de vendas ao longo do tempo (anual/mensal)

---
📂 **Estrutura do Projeto**

```
├── front/                          # Pasta do frontend
│   ├── src/                        # Código-fonte do frontend
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── pages/                  # Páginas da aplicação
│   │   ├── App.jsx                 # Componente principal do frontend
│   │   └── index.js                # Ponto de entrada do frontend
│   ├── public/                     # Arquivos públicos (index.html, etc)
│   └── package.json                # Dependências e scripts do frontend
│
├── back/                           # Pasta do backend
│   ├── app/                        # Código principal da aplicação
│   │   ├── __init__.py             # Inicialização do Flask
│   │   ├── models.py               # Definição dos modelos (Product, Category, Sale)
│   │   ├── routes.py               # Definição das rotas da API
│   │   ├── config.py               # Configurações da aplicação
│   │   └── requirements.txt        # Dependências do backend
│   ├── instance/                   # Instância de configuração (para ambientes específicos)
│   └── app.py                      # Script para rodar a aplicação Flask
│
├── .gitignore                      # Arquivos a serem ignorados pelo Git
└── README.md                       # Documentação do projeto

```
---
🔗 **Rotas e Endpoints da API**

- `GET /products` - Retorna a lista de produtos cadastrados no sistema.
- `POST /products` - Adiciona um novo produto ao sistema.
- `POST /upload-products-csv` - Importa produtos a partir de um arquivo CSV.
- `GET /categories` - Retorna todas as categorias cadastradas no sistema
- `POST /categories` - Adiciona uma nova categoria ao sistema.
- `POST /upload-categories-csv` - Importa categorias a partir de um arquivo CSV.
- `GET /sales` - Retorna a lista de vendas
- `POST /upload-sales-csv` - Upload de vendas via arquivo csv
- `PUT /sales/<sale_id>` - Atualiza os dados (quantidade e valor) de uma venda existente 

---

## 🚀 Como Rodar Localmente

### 🔧 Pré-requisitos

- Node.js (v18+)
- Python 3.9+
- Git
- pip (gerenciador de pacotes Python)


### 🔄 1. Clone o projeto

```bash
git clone https://github.com/AgostiniGuilherme/Admin-Dashboard.git
cd Admin-Dashboard
```

### 2️⃣ Configure o Backend (Flask)
Acesse o diretório do backend 
```bash
cd backend
'Admin-Dashboard/backend'
```
Criação do ambiente virtual
```bash
python -m venv venv
```

Ativação no Windows
```bash
venv\Scripts\activate
```

Ativação no Linux/Mac
```bash
source venv/bin/activate
```

Instale as dependências
```bash
pip install -r requirements.txt
```

Rode a aplicação
```bash
python app.py
```

### 3️⃣ Configure o Frontend (React)
Acesse o diretório do frontend
```bash
cd frontend
'Admin-Dashboard/frontend'
```

Para instalar as dependências do frontend,
No diretório /frontend, execute:
```bash
npm install
```

Rode o frontend da aplicação
```bash
npm run dev
```
---

## 🔗 Deploy em Produção

📍 [https://seu-site-aqui.com](https://seu-site-aqui.com)



---
## 📷 Demonstrações

![image](https://github.com/user-attachments/assets/9018f3ff-ccd4-455f-aeaf-4df42f582dcb)

![image](https://github.com/user-attachments/assets/84f22906-0c9c-46f0-9808-4ea01de48807)

![image](https://github.com/user-attachments/assets/0915f4ca-98c3-4d22-b35e-713e437a26f3)

![image](https://github.com/user-attachments/assets/9fb1ba8e-01f1-4224-913a-c87230147e40)

