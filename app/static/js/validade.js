document.addEventListener("DOMContentLoaded", () => {
    const inserirValidade = document.getElementById("inserir_validade");

    exibirValidade(inserirValidade);

    inserirValidade.addEventListener("change", () => {
        exibirValidade(inserirValidade);
    });
});

function exibirValidade(inserirValidade) {
    const campoValidade = document.getElementById("campo-validade");

    if (!inserirValidade || !campoValidade) {
        console.error("Elemento não encontrado:", inserirValidade, campoValidade);
        return;
    }

    campoValidade.style.display =
        inserirValidade.value === "sim" ? "block" : "none";
}
