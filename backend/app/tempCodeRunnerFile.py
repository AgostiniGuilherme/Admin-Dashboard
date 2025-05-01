@bp.route("/sales/profit", methods=["GET"])
def get_profit():
    sales = Sale.query.all()

    profit_data = []
    for sale in sales:
        # O lucro seria a diferença entre o preço total e o custo do produto
        product = Product.query.get(sale.product_id)
        profit = sale.total_price - product.price # Considerando que price é o preço de venda
        profit_data.append({
            "sale_id": sale.id,
            "product": product.name,
            "quantity": sale.quantity,
            "total_price": sale.total_price,
            "profit": profit,
            "date": sale.date.strftime('%Y-%m-%d')
        })
    
    return jsonify(profit_data)
