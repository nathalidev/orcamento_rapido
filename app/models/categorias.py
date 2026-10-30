from app import db

class Categorias(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(100), nullable=False)

    descricao = db.Column(db.Text)