document.addEventListener('DOMContentLoaded', () => {
    console.log("Arquivo JS carregado!");

    // Pega a data atual
    const hoje = new Date();

    // Formata para o padrão brasileiro (dd/mm/yyyy)
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // mês começa em 0
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

  // Atualiza o conteúdo do elemento
  
  const suaEmpresa = document.getElementById("sua_empresa");
  const email = document.getElementById("email");
  const seuSite = document.getElementById("seu_site");
  const telefoneSuaEmpresa = document.getElementById("telefone_sua_empresa");
  
  // Campos do cliente
  const nomeCliente = document.getElementById("nome_cliente");
  const telefoneCliente = document.getElementById("telefone_cliente");
  const emailCliente = document.getElementById("email_cliente");
  
  // Validade
  const inserirValidade = document.getElementById("inserir_validade");
  const campoValidade = document.getElementById("campo-validade");
  const dataValidade = document.getElementById("data_validade");
  dataValidade.min = hoje;
  dataValidade.max = "9999-12-31";
  
  // Itens
  const servicoItem = document.getElementById("servico_item");
    const quantidade = document.getElementById("quantidade");
    const valor = document.getElementById("valor");
    const desconto = document.getElementById("desconto");

    // Observações
    const observacoes = document.getElementById("observacoes");

    // Prazo
    const prazo = document.getElementById("prazo");

    // Condições de pagamento
    const condicoesPagamento = document.getElementById("condicoes_pagamento");

    // Preview
    const meuPreview = document.getElementById("meu-preview");

    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    function exibirValidade() {
        inserirValidade.addEventListener("change", function () {
            if (this.value === "sim") {
                campoValidade.style.display = "block";
            } else {
                campoValidade.style.display = "none";
            }
        });
    }

    function pegarValorExibir(campoDoInput, campoDoOrcamento, doc) {
        const campoEmpresa = document.getElementById(campoDoInput);
        const previewEmpresa = doc.getElementById(campoDoOrcamento);
        previewEmpresa.textContent = campoEmpresa.value;
    }

    const campos = [
        ["sua_empresa", "preview_empresa"],
        ["email", "preview_email"],
        ["seu_site", "preview_site"],
        ["telefone_sua_empresa", "telefone_empresa"],

        ["nome_cliente", "preview-cliente"],
        ["telefone_cliente", "telefone-cliente"],
        ["email_cliente", "email-cliente"],

        ["data_validade", "validade"],

        ["observacoes", "observacoes-adicionais"],
        ["prazo", "preview_prazo"],
        ["condicoes_pagamento", "preview_condicoes_pagamento"]
    ];

    
    const iframe = document.getElementById("meuIframe");

    function iniciarPreview() {
        const doc = iframe.contentDocument;

        if (!doc) {
            console.error("Não foi possível acessar o documento do iframe.");
            return;
        }

        function ajustarAltura() {
            iframe.style.height = doc.documentElement.scrollHeight + "px";
        }

        ajustarAltura();

        campos.forEach(([campoDoInput, campoDoOrcamento]) => {
            const input = document.getElementById(campoDoInput);
            const preview = doc.getElementById(campoDoOrcamento);

            if (!input || !preview) {
                console.warn(
                    `Campo não encontrado: ${campoDoInput} -> ${campoDoOrcamento}`
                );
                return;
            }

            input.addEventListener("input", () => {
                preview.textContent = input.value;
                ajustarAltura();
            });
        });
    }

    iframe.addEventListener("load", iniciarPreview);

    if (iframe.contentDocument.readyState === "complete") {
        iniciarPreview();
    }
});