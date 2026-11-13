document.addEventListener("DOMContentLoaded", () => {

    const servico =
        document.getElementById("servico_item");

    const quantidade =
        document.getElementById("quantidade");

    const valor =
        document.getElementById("valor");

    const desconto =
        document.getElementById("desconto");


    const iframe =
        document.getElementById("meuIframe");

    const botaoAdicionar =
        document.getElementById("adicionar-item")

    const servicoInput = document.getElementById("servico_item");
    const quantidadeInput = document.getElementById("quantidade");
    const valorInput = document.getElementById("valor");
    const descontoInput = document.getElementById("desconto");
    const inserirValidade = document.getElementById("inserir_validade");

    // Guarda todos os itens adicionados
    let itens = [];

    // Guarda o índice do item que está sendo editado
    // null significa que estamos adicionando um item novo
    let indiceEditando = null;


    // Botão adicionar
    botaoAdicionar.addEventListener(
        "click",
        adicionarItem
    );


    // --------------------------------
    // ADICIONAR / EDITAR ITEM
    // --------------------------------

    /**
     * Adiciona um item novo ou substitui o item que está sendo editado.
     * Exemplo: indiceEditando === null adiciona ao final; indiceEditando === 2
     * substitui o item que está na posição 2.
     */
    async function adicionarItem() {
        const quantidade = Number(quantidadeInput.value) || 0;
        const valor = Number(valorInput.value) || 0;
        const desconto = Number(descontoInput.value) || 0;

        const novoItem = {
            servico: servicoInput.value.trim(),
            quantidade,
            valor,
            desconto
        };

        // Evita adicionar item vazio
        if (!novoItem.servico) {

            alert("Informe o serviço ou item.");

            return;
        }

        if (novoItem.quantidade <= 0) {

            alert("A quantidade deve ser maior que zero.");

            return;
        }

        if (novoItem.valor < 0) {

            alert("O valor não pode ser negativo.");

            return;
        }

        if (novoItem.desconto < 0) {

            alert("O desconto não pode ser negativo.");

            return;
        }


        // Se não estiver editando,
        // adiciona um novo item
        if (indiceEditando === null) {

            itens.push(novoItem);

        } else {

            // Se estiver editando,
            // substitui o item existente
            itens[indiceEditando] = novoItem;

            // Sai do modo de edição
            indiceEditando = null;
        }

        atualizarCampoHidden();

        renderizarItens();

        limparCampos();

        await atualizarResumo();
    }


    // --------------------------------
    // RENDERIZAR ITENS NO IFRAME
    // --------------------------------

    function renderizarItens() {

        const doc =
            iframe.contentDocument;


        if (!doc) {

            console.error(
                "Não foi possível acessar o iframe."
            );

            return;
        }


        const lista =
            doc.getElementById("lista-itens");


        if (!lista) {

            console.error(
                "Elemento #lista-itens não encontrado no iframe."
            );

            return;
        }


        // Limpa a lista antes de reconstruir
        lista.innerHTML = "";


        itens.forEach((item, index) => {

            const linha =
                doc.createElement("tr");


            const colunaServico =
                doc.createElement("td");

            const colunaQuantidade =
                doc.createElement("td");

            const colunaValor =
                doc.createElement("td");

            const colunaTotal =
                doc.createElement("td");

            const colunaAcoes =
                doc.createElement("td");


            // Calcula o total do item
            const total = new Big(item.valor)
                .times(item.quantidade)
                .minus(item.desconto);


            colunaServico.textContent =
                item.servico;


            colunaQuantidade.textContent =
                item.quantidade;


            colunaValor.textContent =
                formatarMoeda(item.valor);


            colunaTotal.textContent =
                formatarMoeda(total);


            // --------------------------------
            // BOTÃO EDITAR
            // --------------------------------

            const botaoEditar =
                doc.createElement("button");

            botaoEditar.textContent =
                "Editar";

            botaoEditar.classList.add("botao-editar");

            botaoEditar.addEventListener(
                "click",
                async () => {

                    await editarItem(index);

                }
            );

            const botaoExcluir = doc.createElement("button");

            botaoExcluir.textContent =
                "Excluir";

            botaoExcluir.classList.add("botao-excluir");

            botaoExcluir.addEventListener(
                "click",
                () => {

                    removerItem(index);
                }
            );

            colunaAcoes.appendChild(
                botaoEditar
            );

            colunaAcoes.appendChild(
                botaoExcluir
            );


            // Adiciona as colunas à linha
            linha.appendChild(
                colunaServico
            );

            linha.appendChild(
                colunaQuantidade
            );

            linha.appendChild(
                colunaValor
            );

            linha.appendChild(
                colunaTotal
            );

            linha.appendChild(
                colunaAcoes
            );


            // Adiciona a linha à tabela
            lista.appendChild(
                linha
            );

        });
    }


    // --------------------------------
    // EXCLUIR ITEM
    // --------------------------------

    /**
     * Remove um item e mantém correto o índice de uma edição em andamento.
     * Exemplo: se indiceEditando === 3 e o índice 2 for removido, o item
     * editado passa para a posição 2 e indiceEditando também passa a valer 2.
     */
    async function removerItem(index) {

        itens.splice(index, 1);

        if (indiceEditando === index) {

            indiceEditando = null;
            limparCampos();

        } else if (
            indiceEditando !== null
            && indiceEditando > index
        ) {

            indiceEditando -= 1;
        }

        atualizarCampoHidden();
        renderizarItens();
        await atualizarResumo();
    }


    // --------------------------------
    // EDITAR ITEM
    // --------------------------------

    /**
     * Carrega um item nos campos do formulário e guarda sua posição.
     * Exemplo: editarItem(2) define indiceEditando como 2 para que o próximo
     * envio substitua itens[2], em vez de adicionar outro item.
     */
    async function editarItem(index) {

        const item =
            itens[index];


        // Coloca os dados do item
        // de volta nos campos do formulário

        servico.value =
            item.servico;

        quantidade.value =
            item.quantidade;

        valor.value =
            item.valor;

        desconto.value =
            item.desconto;


        // Guarda qual item está sendo editado
        indiceEditando =
            index;


        // Coloca o cursor no campo
        servico.focus();

        atualizarCampoHidden();

        await atualizarResumo();
    }


    // --------------------------------
    // LIMPAR CAMPOS
    // --------------------------------

    function limparCampos() {

        servico.value = "";

        quantidade.value = 1;

        valor.value = "";

        desconto.value = 0;

        servicoInput.focus();
    }


    // --------------------------------
    // FORMATAR MOEDA
    // --------------------------------

    function formatarMoeda(valor) {

        const numero =
            typeof valor === "object"
                ? Number(valor.toString())
                : Number(valor);

        return numero.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    function atualizarCampoHidden() {
        document.getElementById("itens_orcamento").value =
            JSON.stringify(itens);
    }

    async function atualizarResumo() {
        const doc = iframe.contentDocument;

        if (!doc) {
            console.error(
                "Não foi possível acessar o iframe para atualizar o resumo."
            );

            return;
        }

        try {
            const respostaSubtotal = await fetch("/atualizar-subtotal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(itens)
            });

            if (!respostaSubtotal.ok) {
                throw new Error(
                    `Falha ao atualizar subtotal: HTTP ${respostaSubtotal.status}`
                );
            }

            const dadosSubtotal = await respostaSubtotal.json();
            const subtotal = new Big(dadosSubtotal.subtotal);

            doc.getElementById("subtotal").textContent =
                formatarMoeda(subtotal);

            const respostaDesconto = await fetch("/atualizar-desconto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(itens)
            });

            if (!respostaDesconto.ok) {
                throw new Error(
                    `Falha ao atualizar desconto: HTTP ${respostaDesconto.status}`
                );
            }

            const dadosDesconto = await respostaDesconto.json();
            const desconto = new Big(dadosDesconto.desconto);

            doc.getElementById("preview_desconto").textContent =
                formatarMoeda(desconto);

            const respostaTotal = await fetch("/atualizar-total", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(itens)
            });

            if (!respostaTotal.ok) {
                throw new Error(
                    `Falha ao atualizar total: HTTP ${respostaTotal.status}`
                );
            }

            const dadosTotal = await respostaTotal.json();
            const total = new Big(dadosTotal.total);

            doc.getElementById("total-tudo").textContent =
                formatarMoeda(total);
        } catch (erro) {
            console.error("Não foi possível atualizar o resumo.", erro);
        }
    }

});
