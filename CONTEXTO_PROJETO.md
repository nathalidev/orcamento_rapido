# Contexto do projeto: Orçamento Rápido

## 1. Visão geral

**Orçamento Rápido** é uma aplicação web em português do Brasil para montar
orçamentos profissionais de forma rápida. O usuário informa os dados da
empresa, do cliente, dos itens, dos valores e das condições comerciais; a
aplicação monta uma prévia visual do documento e permite imprimi-la pelo
navegador, normalmente escolhendo “Salvar como PDF”.

O projeto está em desenvolvimento. A interface principal já permite criar e
visualizar um orçamento, enquanto os modelos de banco de dados e a primeira
migração preparam funcionalidades futuras de persistência, usuários,
empresas, clientes e pagamentos.

## 2. Stack e arquitetura

- **Python 3.12** (o ambiente virtual presente no repositório é `venv/`).
- **Flask 3.1.3** como servidor web.
- **Jinja2** para renderização dos templates HTML.
- **Flask-SQLAlchemy 3.1.1** e **SQLAlchemy 2.1.6** para os modelos.
- **SQLite** como banco configurado atualmente (`sqlite:///app.db`).
- **Flask-Migrate/Alembic** para migrações.
- **HTML, CSS e JavaScript** no cliente.
- **Vue 3**, carregado por CDN, atualmente usado apenas no pequeno exemplo
  `Hello vue!` que está no template de criação.
- **Big.js 6.2.2**, carregado por CDN, usado nos cálculos e na formatação dos
  valores monetários no navegador.

A aplicação segue uma estrutura Flask simples:

```text
main.py                         ponto de entrada
app/
  __init__.py                   criação da aplicação, banco e migrações
  routes/
    paginas_criacao_orcamento.py rotas e regras do fluxo atual
  models/                       modelos SQLAlchemy e enums
  templates/                    páginas Jinja e template do orçamento
  static/
    css/                        estilos
    js/                         interações e cálculos do formulário
    images/                     imagens da interface
    fonts/                      fonte local
migrations/                     configuração e versões Alembic
docs/tecnologias/               anotações sobre bibliotecas usadas
requirements.txt                dependências Python
```

O diretório `venv/` é ambiente local e está no `.gitignore`; ele não faz parte
do código da aplicação e não deve ser editado nem versionado.

## 3. Como executar

Na raiz do repositório:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

O servidor é iniciado em `0.0.0.0` com `debug=True`. Em desenvolvimento,
acesse `http://localhost:5000`.

Também é possível iniciar com a CLI do Flask, apontando para `main:app`, mas
`python main.py` é o caminho explicitamente configurado no projeto.

Para aplicar a migração inicial, use o ambiente virtual ativado:

```bash
flask --app main:app db upgrade
```

O banco SQLite é criado no local resolvido pelo Flask para a URI configurada.
Não há arquivo de configuração por ambiente nem uso de variáveis de ambiente
para a URI do banco ou para uma chave secreta.

## 4. Páginas e rotas

As rotas ficam em `app/routes/paginas_criacao_orcamento.py`.

| Método | URL | Função |
|---|---|---|
| GET | `/` | Página inicial (`index.html`). |
| GET | `/criar-orcamento` | Formulário de criação e prévia em iframe. |
| GET, POST | `/orcamento` | Renderiza o documento de orçamento (`components/orcamento.html`). O POST recebe os dados do formulário. |
| GET | `/sobre` | Página institucional. |
| GET | `/contato` | Página de contato. O formulário HTML aponta POST para esta URL, mas atualmente só existe handler GET. |
| POST | `/atualizar-subtotal` | Calcula o subtotal dos itens recebidos em JSON. |
| POST | `/atualizar-desconto` | Soma os descontos dos itens recebidos em JSON. |
| POST | `/atualizar-total` | Calcula subtotal menos descontos. |
| POST | `/atualizar-total-item` | Calcula o total de um item: quantidade vezes valor menos desconto. |

As quatro rotas de cálculo retornam JSON com valores decimais serializados
como string. Erros de formato, tipo ou valor inválido retornam HTTP 400 por
meio de `abort`.

## 5. Fluxo de criação do orçamento

1. A pessoa abre `/criar-orcamento`.
2. `criar_orcamento.html` mostra os campos de empresa, cliente, validade,
   itens, observações, prazo e condições de pagamento.
3. O iframe `#meuIframe` carrega `/orcamento` via GET. Sem dados enviados, a
   rota usa valores padrão como `"Insira dados"` e uma lista vazia de itens.
4. `preview.js` sincroniza os campos textuais do formulário com os elementos
   equivalentes dentro do iframe.
5. `validade.js` mostra ou esconde o campo de validade e define a data mínima
   como hoje quando a opção é “Sim”.
6. `itens_orcamento.js` mantém os itens em um array JavaScript, permitindo
   adicionar, editar e excluir itens. O array é serializado no campo hidden
   `itens_orcamento`.
7. Ao alterar a lista, o JavaScript chama as rotas JSON de cálculo para
   atualizar subtotal, desconto, total e total individual. A tabela da prévia
   é reconstruída dentro do iframe.
8. Ao clicar em “Gerar PDF”, `preview.js` chama `print()` na janela do iframe.
   Não existe geração de arquivo PDF no servidor nem botão de download
   implementado; o PDF depende da caixa de impressão do navegador.
9. O formulário HTML está configurado com `POST /orcamento`, mas o botão
   “Gerar PDF” é `type="button"` e apenas imprime a prévia. O envio POST
   acontece somente se houver uma ação de submissão do formulário.

### Campos do formulário

- Empresa: `sua_empresa`, `email`, `seu_site`, `telefone_sua_empresa`.
- Cliente: `nome_cliente`, `telefone_cliente`, `email_cliente`.
- Validade: `inserir_validade` (`sim` ou `nao`) e `data_validade`.
- Item: `servico`, `quantidade`, `valor`, `desconto`.
- Lista completa de itens: `itens_orcamento`, JSON no campo hidden.
- Complementares: `observacoes`, `prazo`, `condicoes_pagamento`.

No servidor, datas recebidas no formato HTML `YYYY-MM-DD` são exibidas no
documento como `DD/MM/YYYY`. A validade, quando habilitada, deve ser hoje ou
uma data futura. Quantidade e valor unitário devem ser positivos; descontos
não podem ser negativos. A regra do servidor é a autoridade final, mesmo que
o navegador também faça validações.

## 6. Cálculos

Para cada item:

```text
total_do_item = quantidade * valor_unitario - desconto
```

No orçamento:

```text
subtotal = soma(quantidade * valor_unitario)
desconto_total = soma(desconto)
total = subtotal - desconto_total
```

O backend usa `Decimal` para evitar erros de ponto flutuante. No frontend,
`Big.js` é usado ao receber os resultados das rotas para exibir valores em
reais (`pt-BR`, `BRL`). A função `formatarMoeda` converte o resultado para
apresentação; ela não deve ser usada como fonte de verdade para validação.

## 7. Banco de dados e domínio planejado

Os modelos estão em `app/models/` e são importados por
`app/models/__init__.py`. A migração inicial
`migrations/versions/261b3492e779_inicio_da_migracao.py` cria as tabelas
abaixo:

- **`Usuarios`**: nome, e-mail único, hash de senha, telefone, cargo, foto,
  status ativo e datas de criação/login.
- **`Empresas`**: dados da empresa, contatos, CNPJ, logo, redes sociais,
  descrição e cores.
- **`Clientes`**: nome, empresa, contatos, cidade, estado e observações.
- **`Orcamentos`**: vínculos com empresa e cliente, descrição, valores,
  status, datas de criação/validade/envio.
- **`ItensDoOrcamento`**: vínculo com orçamento, nome/descrição, quantidade,
  preço unitário e preço total.
- **`Pagamentos`**: vínculo com orçamento, forma, parcelas, valor, status e
  data de pagamento.
- **`Categorias`**: nome e descrição; existe como modelo, mas não é incluída
  na migração inicial.

Os enums em `app/models/enums.py` representam status de orçamento
(`Rascunho`, `Enviado`, `Aprovado`, `Rejeitado`, `Cancelado`), formas de
pagamento e status de pagamento. Atualmente esses modelos não são usados pelo
fluxo de criação: a rota `/orcamento` apenas monta um contexto e renderiza o
template, sem criar registros no banco.

Também não há relacionamentos ORM (`relationship`) declarados entre os
modelos. Ao implementar persistência, será necessário definir transações,
relacionamentos, validação, autenticação/autorização e a estratégia para
converter os dados do formulário em entidades.

## 8. Frontend e organização visual

- `static/css/global.css` contém estilos compartilhados.
- Os demais CSS são separados por página ou componente.
- `templates/components/orcamento.html` é o documento visual que aparece no
  iframe e é impresso.
- O layout usa imagens locais da marca e fontes externas como Material Symbols,
  Google Fonts e Font Awesome.
- A página de contato possui links externos para WhatsApp, e-mail e LinkedIn.

Ao alterar IDs no HTML do formulário ou no documento do orçamento, atualize
também os mapeamentos em `preview.js` e os seletores em
`itens_orcamento.js`; a sincronização entre a página principal e o iframe
depende desses IDs.

## 9. Estado atual e pontos de atenção para futuras IAs

Estas observações são importantes para não inferir funcionalidades que ainda
não existem:

1. O projeto é um protótipo funcional de montagem/prévia, não um sistema
   completo de gestão de orçamentos.
2. A rota POST `/orcamento` não persiste dados, cria usuário, cliente,
   empresa, orçamento ou pagamento.
3. A geração de PDF é impressão do iframe pelo navegador, não geração
   server-side.
4. O formulário de contato não possui processamento POST implementado.
5. A validação de desconto não impede que o desconto total seja maior que o
   subtotal; nesse caso o total pode ficar negativo.
6. A mensagem Vue `Hello vue!` e o campo associado parecem ser um exemplo
   técnico ainda presente na tela de criação, não uma funcionalidade de
   negócio.
7. Não há suíte de testes automatizados no repositório.
8. Não há autenticação, autorização, CSRF, configuração de produção ou
   tratamento de segredos.
9. O uso de `debug=True` em `main.py` é apropriado somente para desenvolvimento.
10. A documentação em `docs/tecnologias/` é material de estudo e não substitui
    a implementação efetiva.

## 10. Orientações para trabalhar neste repositório

- Leia primeiro `app/routes/paginas_criacao_orcamento.py` e os templates
  envolvidos antes de alterar o fluxo.
- Preserve o contrato dos campos e dos endpoints JSON, ou atualize
  simultaneamente frontend e backend.
- Use `Decimal` no backend para dinheiro; evite fazer cálculos monetários
  definitivos apenas com `Number` no JavaScript.
- Valide novamente no servidor todos os valores enviados pelo cliente.
- Ao criar persistência, faça uma migração Alembic correspondente e não dependa
  de `db.create_all()` como substituto.
- Não edite arquivos dentro de `venv/`.
- Depois de mudanças Python, valide a sintaxe e execute a aplicação; depois de
  mudanças no fluxo de orçamento, teste manualmente adicionar, editar, excluir,
  calcular e imprimir.
- Mantenha textos voltados ao usuário em português do Brasil e siga os padrões
  de nomes já usados no projeto.

