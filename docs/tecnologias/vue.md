# Resumo prático: `v-model` vs `v-text` no Vue.js

## 📥 Entrada de dados (`v-model`)

Funciona apenas em elementos de interação como:

- `<input>`
- `<select>`
- `<textarea>`

O `v-model` cria uma **via de mão dupla (two-way data binding)**:

- Captura o valor digitado ou selecionado pelo usuário.
- Atualiza automaticamente a variável associada.
- Quando a variável muda, o campo também é atualizado.

### Exemplo

```html
<input v-model="nome">