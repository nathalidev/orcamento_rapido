function exibirValidade(inserirValidade) {
    const campoValidade = document.getElementById("campo-validade");

    if (!inserirValidade || !campoValidade) {
        return;
    }

    campoValidade.style.display =
        inserirValidade.value === "sim" ? "block" : "none";
}
    