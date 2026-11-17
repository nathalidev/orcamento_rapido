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