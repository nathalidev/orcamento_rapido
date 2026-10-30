from app import db
from datetime import datetime, UTC

# verificar quais campos devem ser unique
class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(100), unique=True, nullable=False)

    senha_hash = db.Column(db.String(128), nullable=False)

    telefone = db.Column(db.String(20), nullable=True)

    cargo = db.Column(db.String(50), nullable=True)

    foto_perfil = db.Column(db.String(200), nullable=True)

    ativo = db.Column(db.Boolean, default=True)

    ultimo_login = db.Column(db.DateTime, nullable=True)

    data_criacao = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC)
    ) 
    
    # com a função lambda no default você garante que a data de criação será registrada no momento exato em que o registro for criado, utilizando o fuso horário UTC. Isso é útil para manter consistência em aplicações que podem ser acessadas de diferentes regiões do mundo. 

    # porém depois para exibir o dado para o user eu preciso converter para o fuso horário local do usuário, preciso definir aonde faço essa conversão.
