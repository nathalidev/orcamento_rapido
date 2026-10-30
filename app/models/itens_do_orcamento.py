from app import db

class ItensDoOrcamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orcamento_id = db.Column(db.Integer, db.ForeignKey('orcamentos.id'), nullable=False)

    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)

    quantidade = db.Column(db.Integer, nullable=False)

    preco_unitario = db.Column(db.Numeric(10,2), nullable=False)
    preco_total = db.Column(db.Numeric(10,2), nullable=False)
