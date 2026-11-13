# 🧮 <span style="color:#4493f8">Big.js — Guia rápido para iniciantes</span>

---

## <span style="color:#4493f8">O que é Big.js?</span>

Big.js é uma biblioteca JavaScript para fazer **cálculos decimais com precisão**.
Ela resolve os problemas de precisão comuns do tipo `Number`.

```js
0.1 + 0.2
// 0.30000000000000004  ❌
```

Com Big.js:

```js
new Big("0.1").plus("0.2").toString()
// "0.3"  ✅
```

---

## <span style="color:#4493f8">Instalação</span>

```bash
npm install big.js
```

Importação:

```js
const Big = require('big.js');

// ou

import Big from 'big.js';
```

---

## <span style="color:#4493f8">Criando valores Big</span>

```js
const valor = new Big("10.50");
```

> <span style="color:#d29922">⚠️ **IMPORTANTE:** prefira **strings** para evitar perda de precisão.</span>

| | Código |
|---|---|
| <span style="color:#2da44e">**Bom**</span> | `new Big("10.99")` |
| <span style="color:#d29922">**Aceitável**</span> | `new Big(10.99)` |

---

## <span style="color:#4493f8">Operações básicas</span>

| Operação | Código | Resultado |
|---|---|---|
| Soma | `new Big("10").plus("5")` | <span style="color:#2da44e">**15**</span> |
| Subtração | `new Big("10").minus("5")` | <span style="color:#2da44e">**5**</span> |
| Multiplicação | `new Big("10").times("5")` | <span style="color:#2da44e">**50**</span> |
| Divisão | `new Big("10").div("4")` | <span style="color:#2da44e">**2.5**</span> |

---

## <span style="color:#4493f8">Métodos mais utilizados</span>

| Método | O que faz |
|---|---|
| `.plus(x)` | Soma |
| `.minus(x)` | Subtração |
| `.times(x)` | Multiplicação |
| `.div(x)` | Divisão |
| `.pow(x)` | Potência |
| `.sqrt()` | Raiz quadrada |
| `.abs()` | Valor absoluto |
| `.round(n)` | Arredondamento |

---

## <span style="color:#4493f8">Exemplo</span>

```js
const preco = new Big("19.99");
const quantidade = new Big("3");

const total = preco.times(quantidade);

console.log(total.toString());
// 59.97
```

---

## <span style="color:#4493f8">Encadeamento de operações</span>

```js
const resultado = new Big("100")
  .minus("20")
  .times("2")
  .div("4");

console.log(resultado.toString());
// 40
```

**Passo a passo:**

1. 100 − 20 = **80**
2. 80 × 2 = **160**
3. 160 ÷ 4 = <span style="color:#2da44e">**40**</span>

---

## <span style="color:#4493f8">Comparações</span>

```js
const a = new Big("10");
const b = new Big("20");
```

| Método | Significa |
|---|---|
| `a.eq(b)` | Igual |
| `a.gt(b)` | Maior que |
| `a.gte(b)` | Maior ou igual |
| `a.lt(b)` | Menor que |
| `a.lte(b)` | Menor ou igual |

Exemplos:

| Código | Resultado |
|---|---|
| `a.lt(b)` | <span style="color:#2da44e">**true**</span> |
| `a.gt(b)` | <span style="color:#e5534b">**false**</span> |

---

## <span style="color:#4493f8">Obtendo o valor</span>

```js
const valor = new Big("123.45");
```

| Código | Resultado |
|---|---|
| `valor.toString()` | `"123.45"` |
| `valor.toFixed(2)` | `"123.45"` |
| `valor.toNumber()` | `123.45` |

> <span style="color:#e5534b">⚠️ **ATENÇÃO:** ao converter para `Number` você pode perder precisão.</span>

---

## <span style="color:#4493f8">Imutabilidade</span>

Big.js <span style="color:#e5534b">**NÃO**</span> altera o valor original.

```js
const a = new Big("10");
const b = a.plus("5");

a.toString(); // "10"
b.toString(); // "15"
```

O objeto original permanece intacto.

---

## <span style="color:#4493f8">Casos de uso comuns</span>

- ✅ Sistemas financeiros
- ✅ Controle de estoque
- ✅ Cálculos monetários
- ✅ Parcelamentos
- ✅ Juros compostos
- ✅ Criptomoedas
- ✅ Conversão de moedas
- ✅ Relatórios financeiros

---

## <span style="color:#4493f8">Erros comuns</span>

### 1) Usar operadores matemáticos normais

```js
const a = new Big("10");
const b = new Big("5");
```

```diff
- a + b       // ERRADO: dá "105" (junta os textos em vez de somar)
+ a.plus(b)   // CERTO: dá 15
```

### 2) Misturar Big com Number sem necessidade

```diff
- new Big(10.50)     // evite
+ new Big("10.50")   // prefira
```

---

## <span style="color:#4493f8">Resumo para decorar</span>

| Método | Equivale a |
|---|---|
| `plus()` | `+` |
| `minus()` | `-` |
| `times()` | `*` |
| `div()` | `/` |
| `pow()` | `^` |
| `sqrt()` | raiz quadrada |

> <span style="color:#2da44e">💡 **Regra principal:** se o cálculo envolve dinheiro ou precisão decimal, use **Big.js** em vez de `Number`.</span>

a lib big.js teve sua classe(construtor) Big importada e alguns métodos utilizados no itens_orcamento.js para cálculos precisos envolvendo valores monetários e afins.
