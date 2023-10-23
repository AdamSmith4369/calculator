const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const ul = document.querySelector(".ul");
const container = document.querySelector(".container");
const deleteIcon = document.querySelector("i");

//! Sayfa load edilince input'a odaklan

window.addEventListener("load", () => {
  input.focus();
});

//! LOCAL STORAGE'A EKLE
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log("todos :>> ", todos);

//! LOCAL STORAGE'I DOMA BASMA
const render = () => {
  todos.forEach((element) => {
    createElement(element);
  });
};
render();

//! Btn butona  click eventı tanımla ve listeye ekle

btn.addEventListener("click", () => {
  if (input.value == "") {
    alert("Please Enter A Event!!!");
  } else {
    let x = input.value;
    createElement(x);

    todos.push(x);
    localStorage.setItem("TODOS", JSON.stringify(todos));
    console.log("todos1 :>> ", todos);
    input.value = "";
  }
});

function createElement(x) {
  const createdLi = document.createElement("li");
  createdLi.setAttribute("id", new Date().getTime());
  const i = document.createElement("i");
  i.setAttribute("class", "fa-regular fa-trash-can fa-1x");
  const p = document.createElement("p");
  p.setAttribute("class", "pler");
  const pTextNode = document.createTextNode(`${x}`);
  p.appendChild(pTextNode);
  createdLi.appendChild(i);
  createdLi.appendChild(p);
  ul.appendChild(createdLi);
}

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    //? delete butonunun parent'ini DOM'dan sil
    e.target.parentElement.remove();
    console.log("todos3 :>> ", todos);
    console.log("silinen eleman :>> ", e.target.nextElementSibling.innerText);
    todos = todos.filter(
      (todo) => todo !== e.target.nextElementSibling.innerText
    );
    console.log("todos4 :>> ", todos);
    localStorage.setItem("TODOS", JSON.stringify(todos));
  } else if (e.target.classList.contains("pler")) {
    e.target.classList.toggle("pUnderline");
  }
});

//! İnput içinde iken entera basılınca ADD btn çalışsın
input.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    btn.click();
  }
});
