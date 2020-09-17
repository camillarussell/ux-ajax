
# Experiência de Usuário para Requisições JavaScript Assíncronas


Experiência de usuário não é só estética. Em páginas com **Ajax**, o comportamento da interface pode comunicar que estamos aguardando uma resposta externa.

Um **GIF** ou até a palavra **CARREGANDO** indica que o sistema já começou a trabalhar no seu pedido.

Se nós esperarmos até a resposta do request para mudar a página, o usuário pode achar que não clicou no lugar certo ou até que a página está travada.

## Vamos ver na prática:

Criaremos hoje uma página para busca de usuário na API do GitHub.

![](https://miro.medium.com/max/294/1*mrm2XAvrx0tYivKycyAP9w.gif)

Para manter simples, vamos usar **Axios**, sem **React** ou **Angular**. Também adicionamos o **Bootstrap**, mas esse artigo irá focar mais no **JavaScript**. O estilo **CSS** pode ser visto em mais detalhes no [repositório do projeto](https://github.com/camillarussell/ux-ajax).

**HTML inicial**

A busca do usuário será iniciado por um formulário. Ainda não escrevemos a função `searchFormSubmit`, mas chegaremos lá.

```html
<form class="form-inline my-2 my-lg-0" onsubmit="searchFormSubmit(event)">
  <input
    class="form-control mr-sm-2"
    type="search"
    placeholder="Usuário"
    aria-label="Search"
    name="username"
  />
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
    Buscar
  </button>
</form>

```

O segundo ponto é dar um id para a div que iremos manipular. No caso escolhemos `result-container`:

```html
<div class="result-container" id="result-container">
  <h2>Nenhum usuário selecionado</h2>
  <h4>Busque um usuário do GitHub na barra de pesquisa.</h4>
</div>

```

### **JavaScript**

Como iremos referenciar esse `result-container` muitas vezes, é interessante já começar referenciando esse elemento numa variável.

`var resultContainer = document.querySelector("#result-container");`

### Função searchFormSubmit

Essa função irá chamar 3 outras funções, que ainda iremos escrever.
-`setLoading` Coloca a página em estado de carregando.
-`setUser` Apresenta os dados do usuário na tela.
-`setNotFound` Apresenta mensagem de erro.

![](https://miro.medium.com/max/700/1*T7H39bKFZ6G2hOjlD4uwjg.png)

A ideia é chamar `setLoading` antes mesmo de fazer o request com **Axios**.
Caso o usuário exista, chamamos a função `setUser`.
Caso não, chamamos `setNotFound`

```javascript
function searchFormSubmit(event) {
  //Impede o formulário de redirecionar a página
  event.preventDefault();
  
  setLoading();

  var username = event.target.username.value;
  axios
    .get(`https://api.github.com/users/${username}`)
    .then(setUser)
    .catch(setNotFound);
}
```

### Função de `setLoading`

O objetivo dessa função é:
-Remover todo conteúdo de `resultContainer`.
-Adicionar o gif carregamento.
-Adicionar o texto de carregamento.

```javascript
function setLoading() {
  resultContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = "loading.gif";
  resultContainer.appendChild(img);

  var h2 = document.createElement("h2");
  h2.innerText = "Carregando...";
  resultContainer.appendChild(h2);
}
```

### Função `setUser`

O objetivo dessa função é:
-Coletar username e a imagem da resposta do **Axios**
-Remover todo conteúdo de `resultContainer`.
-Adicionar a imagem avatar do usuário.
-Adicionar o texto do username.

```javascript
function setUser(response) {
  var imageSrc = response.data.avatar_url;
  var username = response.data.login;

  console.log(document.querySelector("#result-container"));
  resultContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = imageSrc;
  img.classList.add("user-image");
  resultContainer.appendChild(img);

  var h2 = document.createElement("h2");
  h2.innerText = username;
  resultContainer.appendChild(h2);
}
```

Observe que adicionamos uma classe `user-image`ao img. É apenas um css para deixar a imagem redonda.

### Função `setNotFound`

O objetivo dessa função é:
-Remover todo conteúdo de `resultContainer`.
-Adicionar imagem indicando que o usuário não foi encontrado.

```javascript
function setNotFound() {
  resultContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = "404.png";
  img.alt = "Usuário não encontrado";
  resultContainer.appendChild(img);
}
```

Por hoje é isso. Obrigada!
