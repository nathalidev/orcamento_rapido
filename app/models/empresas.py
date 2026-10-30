from app import db
from datetime import datetime, UTC

class Empresas(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nome_empresa = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(100), nullable=False)

    telefone = db.Column(db.String(20), nullable=False)

    site = db.Column(db.String(100), nullable=True)

    instagram = db.Column(db.String(100), nullable=True)

    facebook = db.Column(db.String(100), nullable=True)

    linkedin = db.Column(db.String(100), nullable=True)

    cnpj = db.Column(db.String(14), nullable=False)

    logo = db.Column(db.String(200), nullable=True)

    descricao = db.Column(db.Text, nullable=True)

    cor_primaria = db.Column(db.String(7), nullable=True)

    cor_secundaria = db.Column(db.String(7), nullable=True)
    
    data_criacao = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC)
    ) 