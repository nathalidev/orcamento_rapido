import json
from decimal import Decimal, InvalidOperation
from datetime import datetime

from flask import abort, jsonify, render_template, request

from app import app

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/criar-orcamento")
def criar_orcamento():
    return render_template("criar_orcamento.html")

@app.route('/orcamento', methods=["GET", "POST"])
def orcamento():
    nome_sua_empresa = request.form.get("sua_empresa") if request.form.get("sua_empresa") != None else "Insira dados"
    email_sua_empresa = request.form.get("email") if request.form.get("email") != None else "Insira dados"
    site_sua_empresa = request.form.get("seu_site") if request.form.get("seu_site") != None else "Insira dados"
    telefone_sua_empresa = request.form.get("telefone_sua_empresa") if request.form.get("telefone_sua_empresa") != None else "Insira dados"

    nome_cliente = request.form.get("nome_cliente") if request.form.get("nome_cliente") != None else "Insira dados"
    telefone_cliente = request.form.get("telefone_cliente") if request.form.get("telefone_cliente") != None else "Insira dados"
    email_cliente = request.form.get("email_cliente") if request.form.get("email_cliente") != None else "Insira dados"

    inserir_validade = request.form.get("inserir_validade")
    data_validade_ingles = request.form.get("data_validade")
    data_validade = datetime.strptime(data_validade_ingles, "%Y-%m-%d").strftime("%d/%m/%Y") if data_validade_ingles else "00/00/0000"

    observacoes_adicionais = request.form.get("observacoes") if request.form.get("observacoes") != None else "Insira dados"
    prazo_entrega_ingles = request.form.get("prazo")
    prazo_entrega = datetime.strptime(prazo_entrega_ingles, "%Y-%m-%d").strftime("%d/%m/%Y") if prazo_entrega_ingles else "00/00/0000"
    condicoes_pagamento = request.form.get("condicoes_pagamento") if request.form.get("condicoes_pagamento") != None else "Insira dados"
    data_hoje = datetime.now().strftime("%d/%m/%Y")

    itens_json = request.form.get("itens_orcamento", "[]")
    try:
        itens_recebidos = json.loads(itens_json)
    except json.JSONDecodeError:
        abort(400, description="A lista de itens do orçamento é inválida.")

    if not isinstance(itens_recebidos, list):
        abort(400, description="A lista de itens do orçamento deve ser uma lista.")
    if len(itens_recebidos) == 0:
        abort(400, description="A lista de itens do orçamento não pode estar vazia.")

    itens = []
    for item in itens_recebidos:
        try:
            quantidade = Decimal(str(item["quantidade"]))
            valor_unitario = Decimal(str(item["valor"]))
            desconto = Decimal(str(item.get("desconto") or 0))
            descricao = str(item["servico"])
        except (KeyError, TypeError, ValueError, InvalidOperation):
            abort(400, description="Um dos itens do orçamento é inválido.")

        total_item = (quantidade * valor_unitario) - desconto
        itens.append({
            "descricao": descricao,
            "quantidade": quantidade,
            "valor_unitario": valor_unitario,
            "desconto": desconto,
            "total": total_item,
        })

    subtotal = calcular_subtotal(itens, "valor_unitario")
    valor_desconto = calcular_desconto(itens)
    total = calcular_total(subtotal, valor_desconto)

    context = {
        "nome_sua_empresa": nome_sua_empresa,
        "email_sua_empresa": email_sua_empresa,
        "site_sua_empresa": site_sua_empresa,
        "telefone_sua_empresa": telefone_sua_empresa,
        "data_hoje": data_hoje,

        "nome_cliente": nome_cliente,
        "telefone_cliente": telefone_cliente,
        "email_cliente": email_cliente,

        "inserir_validade": inserir_validade,
        "data_validade": data_validade,

        "itens": itens,
        "valor_desconto": valor_desconto,

        "observacoes_adicionais": observacoes_adicionais,
        "prazo_entrega": prazo_entrega,
        "condicoes_pagamento": condicoes_pagamento,
        "subtotal": subtotal,
        "total": total
    }

    return render_template('components/orcamento.html', **context)

@app.route("/contato")
def contato():
    return render_template("contato.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

@app.route("/atualizar-subtotal", methods=["POST"])
def atualizar_subtotal():
    itens = request.get_json(silent=True)

    validar_itens_json(itens)
    try:
        subtotal = calcular_subtotal(itens, "valor")
    except (KeyError, TypeError, InvalidOperation):
        abort(400, description="Um dos itens do orçamento é inválido.")

    return jsonify({"subtotal": str(subtotal)})

@app.route("/atualizar-desconto", methods=["POST"])
def atualizar_desconto():
    itens = request.get_json(silent=True)

    validar_itens_json(itens)
    try:
        valor_desconto = calcular_desconto(itens)
    except (KeyError, TypeError, InvalidOperation):
        abort(400, description="Um dos itens do orçamento é inválido.")

    return jsonify({"desconto": str(valor_desconto)})

@app.route("/atualizar-total", methods=["POST"])
def atualizar_total():
    itens = request.get_json(silent=True)

    validar_itens_json(itens)
    try:
        subtotal = calcular_subtotal(itens, "valor")
        valor_desconto = calcular_desconto(itens)
    except (KeyError, TypeError, InvalidOperation):
        abort(400, description="Um dos itens do orçamento é inválido.")

    total = calcular_total(subtotal, valor_desconto)
    return jsonify({"total": str(total)})


def validar_itens_json(itens):
    if not isinstance(itens, list):
        abort(400, description="A lista de itens do orçamento é inválida.")


def calcular_subtotal(itens, chave_valor):
    return sum(
        Decimal(str(item["quantidade"])) * Decimal(str(item[chave_valor]))
        for item in itens
    )


def calcular_desconto(itens):
    return sum(Decimal(str(item["desconto"])) for item in itens)


def calcular_total(subtotal, valor_desconto):
    return subtotal - valor_desconto