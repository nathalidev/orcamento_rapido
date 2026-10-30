from flask import render_template, request #função do flask para renderização de pagina do front
from flask import jsonify # função para retorno de dados em json pro front usar
from flask import redirect, url_for #joga o usuário pra url em questão
from app import app
from decimal import Decimal

from datetime import datetime

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

    nome_servico_item = request.form.get("servico_item") if request.form.get("servico_item") != None else "Insira dados"
    quantidade_item = int(request.form.get("quantidade")) if request.form.get("quantidade") != None else 0.0
    valor_unitario = Decimal(request.form.get("valor")) if request.form.get("valor") != None else 0.0
    valor_desconto = Decimal(request.form.get("desconto")) if request.form.get("desconto") != None else 0.0

    observacoes_adicionais = request.form.get("observacoes") if request.form.get("observacoes") != None else "Insira dados"
    prazo_entrega_ingles = request.form.get("prazo")
    prazo_entrega = datetime.strptime(prazo_entrega_ingles, "%Y-%m-%d").strftime("%d/%m/%Y") if prazo_entrega_ingles else "00/00/0000"
    condicoes_pagamento = request.form.get("condicoes_pagamento") if request.form.get("condicoes_pagamento") != None else "Insira dados"
    data_hoje = datetime.now().strftime("%d/%m/%Y")
    subtotal = quantidade_item * valor_unitario if quantidade_item is not None and valor_unitario is not None else 0.0
    total = subtotal - valor_desconto if subtotal is not None and valor_desconto is not None else 0.0

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

        "nome_servico_item": nome_servico_item,
        "quantidade_item": quantidade_item,
        "valor_unitario": valor_unitario,
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