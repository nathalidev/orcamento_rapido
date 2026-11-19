document.addEventListener("DOMContentLoaded", () => {
    const inserirValidade = document.getElementById("inserir-validade");

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
    
    campoValidade.querySelector("input").required =
        inserirValidade.value === "sim";

    document.getElementById("data-validade").min =
        new Date().toISOString().split("T")[0];
}
