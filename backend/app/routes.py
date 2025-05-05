from flask import Blueprint, request, jsonify
from .models import db, Product, Category, Sale
import pandas as pd

bp = Blueprint('api', __name__)

#Produtos
@bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "brand": p.brand,
            "category": p.category.name if p.category else None
        } for p in products
    ])

@bp.route("/products", methods=["POST"])
def add_product():
    data = request.get_json()

    if not data.get('name') or not data.get('price'):
      return jsonify({"error": "Nome e preço são obrigatórios."}), 400

    new = Product(name=data['name'], price=data['price'], category_id=data.get('category_id'), brand=data['brand'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Produto adicionado!"}), 201

@bp.route("/upload-products-csv", methods=["POST"])
def upload_products_csv():
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado no campo 'file'"}), 400

    file = request.files['file']
    df = pd.read_csv(file)

    for _, row in df.iterrows():
        product = Product.query.get(row['id'])
        if not product:
            product = Product(
                id=row['id'],
                name=row['name'],
                description=row.get('description'),
                price=row['price'],
                category_id=row['category_id'],
                brand=row['brand'],
            )
            db.session.add(product)

    db.session.commit()
    return jsonify({"message": "Produtos importados com sucesso!"})

# @bp.route("/products/<int:product_id>", methods=["DELETE"])
# def delete_product(product_id):
#     product = Product.query.get_or_404(product_id)
#     db.session.delete(product)
#     db.session.commit()
#     return jsonify({"message": "Produto excluído!"})

#Categorias
@bp.route("/categories", methods=["GET"])
def get_categories():
    return jsonify([{"id": c.id, "name": c.name} for c in Category.query.all()])

@bp.route("/categories", methods=["POST"])
def add_category():
    data = request.get_json()
    new = Category(name=data['name'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Categoria adicionada!"}), 201

@bp.route("/upload-categories-csv", methods=["POST"])
def upload_categories_csv():
    file = request.files['file']
    df = pd.read_csv(file)

    for _, row in df.iterrows():
        category = Category.query.get(row['id'])
        if not category:
            category = Category(
                id=row['id'],
                name=row['name']
            )
            db.session.add(category)

    db.session.commit()
    return jsonify({"message": "Categorias importadas!"})

# @bp.route("/categories/<int:category_id>", methods=["DELETE"])
# def delete_category(category_id):
#     category = Category.query.get_or_404(category_id)
#     db.session.delete(category)
#     db.session.commit()
#     return jsonify({"message": "Categoria excluída!"})


#Vendas
@bp.route("/sales", methods=["GET"])
def get_sales():
    sales = Sale.query.all()
    return jsonify([
        {
            "id": s.id,
            "product_id": s.product_id,
            "product": s.product.name,
            "quantity": s.quantity,
            "total_price": s.total_price,
            "date": s.date.strftime('%Y-%m-%d')
        } for s in sales
    ])

@bp.route("/sales", methods=["POST"])
def add_sale():
    data = request.get_json()

    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"error": "Produto não encontrado."}), 404

    sale = Sale(
        product_id=data["product_id"],
        quantity=data["quantity"],
        total_price=data["total_price"],
        date=pd.to_datetime(data["date"]).date()
    )
    db.session.add(sale)
    db.session.commit()
    return jsonify({"message": "Venda registrada!"}), 201

@bp.route("/upload-sales-csv", methods=["POST"])
def upload_sales_csv():
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado no campo 'file'"}), 400

    file = request.files['file']

    try:
        df = pd.read_csv(file)

        for _, row in df.iterrows():
            product = Product.query.get(row['product_id'])

            if product: 
                sale = Sale(
                    product_id=row['product_id'],
                    quantity=row['quantity'],
                    total_price=row['total_price'],
                    date=pd.to_datetime(row['date']).date()  
                )
                db.session.add(sale)  

        db.session.commit()

        return jsonify({"message": "Vendas importadas com sucesso!"})

    except Exception as e:
        # Caso ocorra algum erro durante o processo
        return jsonify({"error": f"Erro ao processar o CSV: {str(e)}"}), 500
    
# @bp.route("/sales/<int:sale_id>", methods=["DELETE"])
# def delete_sale(sale_id):
#     sale = Sale.query.get_or_404(sale_id)
#     db.session.delete(sale)
#     db.session.commit()
#     return jsonify({"message": "Venda excluída!"})

@bp.route("/sales/profit", methods=["GET"])
def get_profit():
    sales = Sale.query.all()

    profit_data = []
    for sale in sales:
        # O lucro seria a diferença entre o preço total e o custo do produto
        product = Product.query.get(sale.product_id)
        profit = sale.total_price # - preço de custo do produto (não está definido no modelo)
        profit_data.append({
            "sale_id": sale.id,
            # "product": product.name,
            # "quantity": sale.quantity,
            "total_price": sale.total_price,
            # "profit": profit,
            "date": sale.date.strftime('%Y-%m-%d')
        })
    
    return jsonify(profit_data)

@bp.route("/sales/<int:sale_id>", methods=["PUT"])
def update_sale(sale_id):
    data = request.get_json()
    sale = Sale.query.get_or_404(sale_id)

    try:
        sale.quantity = data.get("quantity", sale.quantity)
        sale.total_price = data.get("total_price", sale.total_price)
        db.session.commit()

        return jsonify({
            "id": sale.id,
            "product_id": sale.product_id,
            "quantity": sale.quantity,
            "total_price": sale.total_price
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp.route("/sales/by-category", methods=["GET"])
def get_sales_by_category():
    categories = Category.query.all()
    sales_by_category = []

    for category in categories:
        sales = Sale.query.join(Product).filter(Product.category_id == category.id).all()
        total_sales = sum(sale.total_price for sale in sales)
        sales_by_category.append({
            "category": category.name,
            "total_sales": total_sales
        })

    return jsonify(sales_by_category)