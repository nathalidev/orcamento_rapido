Resumo prático: v-model vs v-text no Vue.js

• Entrada de dados (v-model): Funciona apenas em elementos de interação como <input>, <select> e <textarea>. Ele cria uma via de mão dupla (captura o que você digita ou escolhe e salva direto na variável).

• Exibição de dados (v-text): Funciona apenas em tags que exibem texto interno, como <p>, <span> e <div>. Ele cria uma via de mão única (pega o valor da variável e apenas mostra na tela).

A diferença principal está em onde cada diretiva atua e na direção em que os dados viajam. O v-text coloca dados dentro do texto da tag, o v-bind coloca dados dentro dos atributos da tag, e o v-model captura e atualiza dados em campos de formulário.

Lembrando que o v-bind muita das vezes nem é declarado, então seu atalho é :atributo, exemplo :src, :href, :class, :disabled etc.
