from app import db
from datetime import datetime, UTC

class Clientes(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(100), nullable=False)

    empresa = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(100), nullable=False)

    telefone = db.Column(db.String(20), nullable=False)

    cidade = db.Column(db.String(100), nullable=False)

    estado = db.Column(db.String(100), nullable=False)

    observacoes = db.Column(db.Text, nullable=True)
    
    data_criacao = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC)
    )