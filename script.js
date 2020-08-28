var resultContainer = document.querySelector("#result-container");

function searchFormSubmit(event) {
  event.preventDefault();
  setLoading();

  var username = event.target.username.value;
  axios.get(`https://api.github.com/users/${username}`).then(setUser).catch(setNotFound);
}

function setLoading() {
  resultContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = "loading.gif";
  resultContainer.appendChild(img);

  var h2 = document.createElement("h2");
  h2.innerText = "Carregando...";
  resultContainer.appendChild(h2);
}

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

function setNotFound() {
  resultContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = "404.png";
  img.alt = "Usuário não encontrado"
  resultContainer.appendChild(img);
}
