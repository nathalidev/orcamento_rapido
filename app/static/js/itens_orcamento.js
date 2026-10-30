document.addEventListener("DOMContentLoaded", () => {

    const botaoAdicionar =
        document.getElementById("adicionar-item");

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

    function adicionarItem() {

        const novoItem = {

            servico:
                servico.value.trim(),

            quantidade:
                Number(quantidade.value),

            valor:
                Number(valor.value),

            desconto:
                Number(desconto.value) || 0
        };


        // Evita adicionar item vazio
        if (!novoItem.servico) {

            alert("Informe o serviço ou item.");

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


        renderizarItens();

        limparCampos();
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
            const total =
                (item.quantidade * item.valor)
                - item.desconto;


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
                () => {

                    editarItem(index);

                }
            );

            colunaAcoes.appendChild(
                botaoEditar
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
    // EDITAR ITEM
    // --------------------------------

    function editarItem(index) {

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


        console.log(
            "Editando item:",
            index
        );
    }


    // --------------------------------
    // LIMPAR CAMPOS
    // --------------------------------

    function limparCampos() {

        servico.value = "";

        quantidade.value = 1;

        valor.value = "";

        desconto.value = 0;

        servico.focus();
    }


    // --------------------------------
    // FORMATAR MOEDA
    // --------------------------------

    function formatarMoeda(valor) {

        return valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

});
