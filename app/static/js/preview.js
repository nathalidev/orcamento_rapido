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
  
  const suaEmpresa = document.getElementById("sua-empresa");
  const email = document.getElementById("email");
  const seuSite = document.getElementById("seu-site");
  const telefoneSuaEmpresa = document.getElementById("telefone-sua-empresa");
  
  // Campos do cliente
  const nomeCliente = document.getElementById("nome-cliente");
  const telefoneCliente = document.getElementById("telefone-cliente");
  const emailCliente = document.getElementById("email-cliente");
  
  // Validade
  const inserirValidade = document.getElementById("inserir-validade");
  const campoValidade = document.getElementById("campo-validade");
  const dataValidade = document.getElementById("data-validade");
  dataValidade.min = new Date().toISOString().split("T")[0];
  dataValidade.max = "9999-12-31";
  
  // Itens
  const servicoItem = document.getElementById("servico-item");
    const quantidade = document.getElementById("quantidade");
    const valor = document.getElementById("valor");
    const desconto = document.getElementById("desconto");

    // Observações
    const observacoes = document.getElementById("observacoes");

    // Prazo
    const prazo = document.getElementById("prazo");

    // Condições de pagamento
    const condicoesPagamento = document.getElementById("condicoes-pagamento");

    // Preview
    const meuPreview = document.getElementById("meu-preview");

    const regex = /^[A-Za-zÀ-ÿ\s]+$/;


    function pegarValorExibir(campoDoInput, campoDoOrcamento, doc) {
        const campoEmpresa = document.getElementById(campoDoInput);
        const previewEmpresa = doc.getElementById(campoDoOrcamento);
        previewEmpresa.textContent = campoEmpresa.value;
    }

    const campos = [
        ["sua-empresa", "preview-empresa"],
        ["email", "preview-email"],
        ["seu-site", "preview-site"],
        ["telefone-sua-empresa", "telefone-empresa"],

        ["nome-cliente", "preview-cliente"],
        ["telefone-cliente", "telefone-cliente"],
        ["email-cliente", "email-cliente"],

        ["observacoes", "observacoes-adicionais"],
        ["prazo", "preview-prazo"],
        ["condicoes-pagamento", "preview-condicoes-pagamento"]
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


    function imprimirOrcamento() {
        const iframe = document.getElementById("meuIframe");

        if (!iframe || !iframe.contentWindow) {
            console.error("Não foi possível acessar o orçamento.");
            return;
        }

        iframe.contentWindow.print();
    }

    const botaoImprimir = document.getElementById("imprimir-orcamento");

    if (botaoImprimir) {
        botaoImprimir.addEventListener("click", imprimirOrcamento);
    }

});