from enum import Enum

class StatusOrcamento(Enum):
    RASCUNHO = "Rascunho"
    ENVIADO = "Enviado"
    APROVADO = "Aprovado"
    REJEITADO = "Rejeitado"
    CANCELADO = "Cancelado"

class FormaPagamento(Enum):
    PIX = "PIX"
    DINHEIRO = "Dinheiro"
    BOLETO = "Boleto"
    CARTAO_CREDITO = "Cartão de crédito"
    CARTAO_DEBITO = "Cartão de débito"

class StatusPagamento(Enum):
    PENDENTE = "Pendente"
    PAGO = "Pago"
    CANCELADO = "Cancelado"
    ATRASADO = "Atrasado"

