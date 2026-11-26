# Resumo prático: `v-model` vs `v-text` vs `v-bind` no Vue.js

No Vue.js, essas diretivas possuem finalidades diferentes e complementares.

## `v-model`

Utilizado para criar **data binding bidirecional (two-way binding)** entre um campo de formulário e uma propriedade do componente.

### Exemplo

```html
<input v-model="nome" />
<p>{{ nome }}</p>
```

```js
data() {
  return {
    nome: ''
  }
}
```

### O que acontece?

- Quando o usuário digita no input, o valor de `nome` é atualizado.
- Quando `nome` é alterado via JavaScript, o input também é atualizado.

✅ Ideal para formulários.

---

## `v-text`

Utilizado para inserir texto dentro de um elemento HTML.

### Exemplo

```html
<p v-text="mensagem"></p>
```

Equivale a:

```html
<p>{{ mensagem }}</p>
```

### O que acontece?

Se:

```js
mensagem: 'Olá Vue!'
```

O resultado será:

```html
<p>Olá Vue!</p>
```

✅ Ideal para exibir texto simples.

⚠️ Substitui todo o conteúdo interno do elemento.

---

## `v-bind`

Utilizado para vincular dinamicamente atributos HTML a dados do componente.

### Exemplo

```html
<img v-bind:src="imagemUrl" />
```

Forma abreviada:

```html
<img :src="imagemUrl" />
```

### O que acontece?

Se:

```js
imagemUrl: 'https://site.com/logo.png'
```

O atributo `src` receberá esse valor automaticamente.

Também pode ser usado com outros atributos:

```html
<button :disabled="carregando">
  Salvar
</button>

<div :class="classeAtiva">
  Conteúdo
</div>
```

✅ Ideal para atributos, classes, estilos e propriedades dinâmicas.

---

## Comparação rápida

| Diretiva | Função | Exemplo |
|-----------|---------|----------|
| `v-model` | Ligação bidirecional entre dados e formulário | `<input v-model="nome">` |
| `v-text` | Exibe texto dentro de um elemento | `<p v-text="mensagem"></p>` |
| `v-bind` | Liga atributos HTML a dados dinâmicos | `<img :src="url">` |

## Regra de bolso

- **Quer sincronizar um campo de formulário?** → `v-model`
- **Quer mostrar um texto na tela?** → `v-text` ou `{{ }}`
- **Quer alterar atributos dinamicamente?** → `v-bind`

### Exemplo combinando os três

```html
<input v-model="nome">

<h2 v-text="nome"></h2>

<img :src="foto">
```

Neste caso:

- `v-model` captura o valor digitado.
- `v-text` exibe o valor.
- `v-bind` atualiza o atributo `src` da imagem.

---

## Renderização Condicional (`v-if`, `v-else-if` e `v-else`)

As diretivas condicionais do Vue permitem mostrar ou remover elementos do DOM de acordo com o resultado de uma expressão (verdadeira ou falsa). Elas funcionam de forma idêntica à estrutura `if / else if / else` do JavaScript.

### Como funciona cada diretiva

* **`v-if`**: Renderiza o bloco apenas se a condição for verdadeira (`true`).
* **`v-else-if`**: Testa uma nova condição caso o `v-if` (ou outro `v-else-if`) anterior seja falso. Pode ser encadeado várias vezes.
* **`v-else`**: Funciona como um "caso contrário" padrão. Não recebe nenhuma expressão e é exibido quando todas as condições anteriores falham.

> **⚠️ Regra de ouro:** Os elementos com `v-else-if` e `v-else` precisam ser **irmãos imediatos** do elemento com `v-if`. Não pode haver nenhuma outra tag HTML solta entre eles, senão o Vue não reconhece o bloco e gera um erro.

---

### Exemplo prático (Sistema de Notas)

```vue
<script setup>
import { ref } from 'vue'

const nota = ref(8)
</script>

<template>
  <div>
    <p>Nota atual: {{ nota }}</p>

    <p v-if="nota >= 7">Aprovado!</p>
    <p v-else-if="nota >= 5">Em recuperação.</p>
    <p v-else>Reprovado.</p>
  </div>
</template>
```

### Condicionais em múltiplos elementos (`<template>`)

Para aplicar uma condição a vários elementos ao mesmo tempo sem criar uma `<div>` extra no HTML final, envolva o grupo com a tag `<template>`:

```vue
<template v-if="usuarioLogado">
  <h2>Painel de Controle</h2>
  <p>Bem-vindo de volta!</p>
</template>
```
> **Nota:** A tag `<template>` não vira um elemento físico (real) no navegador. Ela funciona apenas como um **agrupador simbólico** (um "invólucro fantasma") que o Vue lê na hora de montar a tela para saber quais elementos obedecem àquela condição, e depois a descarta.

# Diretiva `v-for` no Vue.js

A diretiva `v-for` é usada para renderizar listas de elementos no HTML de forma dinâmica e reativa, funcionando como um laço de repetição (`for` ou `forEach`) diretamente no template.

Sempre que a fonte de dados (array ou objeto) é alterada, o Vue atualiza a interface automaticamente.

---

## Sintaxe Básica

```html
<elemento v-for="item in lista" :key="item.id">
  {{ item }}
</elemento>
```

> **Nota:** É possível substituir `in` por `of` (`v-for="item of lista"`). Ambos funcionam da mesma maneira.

---

## Parâmetros do `v-for`

Os parâmetros disponíveis variam de acordo com o tipo de dado percorrido:

### 1. Percorrendo um Array (Lista)
Aceita até **2 parâmetros**: `(item, index)`
* **`item`:** O elemento atual da lista.
* **`index` *(opcional)*:** A posição numérica do item (começa em `0`).

```html
<ul>
  <li v-for="(produto, index) in produtos" :key="produto.id">
    {{ index }} - {{ produto.nome }} (R\$ {{ produto.preco }})
  </li>
</ul>
```

*(Também suporta desestruturação: `v-for="({ id, nome }, index) in produtos"`)*

### 2. Percorrendo um Objeto
Aceita até **3 parâmetros**: `(valor, chave, index)`
* **`valor`:** O conteúdo da propriedade.
* **`chave` *(opcional)*:** O nome da propriedade.
* **`index` *(opcional)*:** A posição numérica da propriedade no objeto (começa em `0`).

```html
<ul>
  <li v-for="(valor, chave, index) in usuario" :key="chave">
    {{ index }} | {{ chave }}: {{ valor }}
  </li>
</ul>
```

### 3. Percorrendo um Número (Intervalo)
Aceita até **2 parâmetros**: `(numero, index)`
* **`numero`:** O valor atual da contagem (começa em `1` e vai até o limite informado).
* **`index` *(opcional)*:** A posição numérica (começa em `0`).

```html
<span v-for="(n, index) in 5" :key="n">
  Item {{ n }} (índice {{ index }})
</span>
```

---

## A importância do atributo `:key`

O atributo `:key` deve receber um identificador único (como um `id`) para cada item renderizado:

* **Rastreamento:** Permite que o Vue identifique exatamente qual item foi adicionado, removido ou reordenado.
* **Performance:** Evita que toda a lista seja redesenhada no DOM quando apenas um item sofre alteração.
* **Boa prática:** Evite usar o `index` como `:key` caso a lista possa sofrer ordenação, filtragem ou remoção de itens no meio.

---

## Diretiva `v-on` (e o atalho `@`) no Vue.js

A diretiva **`v-on`** (geralmente abreviada pelo símbolo **`@`**) é usada para **escutar eventos do DOM** — como cliques, digitação ou envio de formulários — e executar uma função ou expressão JavaScript quando eles ocorrem.

### Sintaxe básica

```html
<!-- Forma completa -->
<button v-on:click="contador++">Adicionar</button>

<!-- Forma abreviada (padrão no dia a dia) -->
<button @click="salvarDados">Salvar</button>
```

### Principais usos e modificadores

* **Eventos mais comuns:** `@click` (clique), `@input` (enquanto digita), `@change` (ao alterar um campo), `@submit` (envio de formulário) e `@keyup` (ao soltar uma tecla).
* **Passagem de parâmetros:** Permite enviar argumentos diretamente para os métodos:
  ```html
  <button @click="removerItem(item.id)">Remover</button>
  ```
* **Modificadores de evento:** Atalhos integrados que substituem códigos manuais como `event.preventDefault()`:
  * `@submit.prevent="enviarFormulario"` — evita o recarregamento da página no envio do formulário.
  * `@click.stop="abrirMenu"` — impede a propagação do clique para elementos pais.
  * `@keyup.enter="pesquisar"` — executa a ação apenas ao pressionar a tecla **Enter**.

# Diferença entre `let` e `ref()` no Vue.js

No Vue.js, a principal diferença entre usar uma variável comum do JavaScript (`let`) e uma variável reativa (`ref()`) está na **atualização da interface (HTML)**.

## Resumo Rápido

| Característica | `let` (JavaScript comum) | `ref()` (Reatividade do Vue) |
| :--- | :--- | :--- |
| **Atualiza o HTML automaticamente?** | Não | Sim (em tempo real) |
| **Monitorado pelo Vue?** | Não | Sim |
| **Quando a tela muda?** | Apenas se o componente for recriado (ex: refresh `F5` ou troca de rota) | Assim que o `.value` for alterado |
| **Quando usar?** | Variáveis internas, cálculos temporários e lógica que não vai para a tela | Qualquer dado exibido no `<template>` que possa mudar |

---

## Como funciona na prática

### 1. Usando `let` (Sem reatividade)
O Vue lê o valor apenas uma vez quando o componente é carregado. Se o valor mudar depois disso, o JavaScript altera o dado na memória, mas o HTML continua "congelado" no valor antigo.

```vue
<script setup>
let hamburguer = 'X-Salada'

function trocar() {
  hamburguer = 'X-Bacon' // Muda na memória, mas não atualiza a tela
}
</script>

<template>
  <p>Pedido: {{ hamburguer }}</p> <!-- Continua exibindo X-Salada -->
  <button @click="trocar">Trocar</button>
</template>
```

### 2. Usando `ref()` (Com reatividade)
O `ref()` cria um "sensor" em volta do dado. O Vue rastreia todos os lugares do `<template>` que usam aquela variável. Quando `.value` é alterado, o Vue atualiza todos esses pontos automaticamente.

```vue
<script setup>
import { ref } from 'vue'

const hamburguer = ref('X-Salada')

function trocar() {
  hamburguer.value = 'X-Bacon' // Avisa o Vue e atualiza a tela na hora
}
</script>

<template>
  <p>Pedido: {{ hamburguer }}</p> <!-- Atualiza para X-Bacon -->
  <button @click="trocar">Trocar</button>
</template>
```

> **Nota:** No `<script>`, sempre usamos `.value` para ler ou alterar um `ref()`. No `<template>`, o Vue faz isso automaticamente, então basta escrever `{{ hamburguer }}`. Lembrando que em um sistema com flask + vue a exibiçaõ de valores deve ser feita com o v-text `{{}}` espera dados vindos do flask e não do vue. 
