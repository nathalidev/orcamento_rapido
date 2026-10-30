from app import db

class Pagamentos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orcamento_id = db.Column(db.Integer, db.ForeignKey('orcamentos.id'), nullable=False)

    forma_pagamento = db.Column(db.String(50), nullable=False)
    parcelas = db.Column(db.Integer)

    valor_total = db.Column(db.Numeric(10,2), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    data_pagamento = db.Column(db.DateTime(timezone=True))