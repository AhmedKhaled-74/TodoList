let homeContent = document.getElementById("homeContent");
let todoList = JSON.parse(localStorage.getItem("toDo")) || [];
display();

let userInput = document.getElementById("userInput");
let searchInput = document.getElementById("searchInput");

function addItem() {
  todoList.push(userInput.value);
  localStorage.setItem("toDo", JSON.stringify(todoList));
  userInput.value = "";
  display();
}

function display() {
  let cartona = "";
  todoList.forEach((item) => {
    cartona += `
     <div
                    class="home-item mb-2 rounded-pill text-dark mx-auto w-25 bg-danger d-flex justify-content-between align-items-center">
                    <p id="item" class="m-0 p-0">${item}</p>
                    <i onclick="deleteItem('${item}')" class="fa-sharp fa-solid fa-trash"></i>
                </div>`;
  });
  homeContent.innerHTML = cartona;
}

function deleteItem(item) {
  todoList.splice(todoList.indexOf(item), 1);
  localStorage.setItem("toDo", JSON.stringify(todoList));
  display();
  searchInput.value = "";
}

searchInput.addEventListener("keyup", () => {
  let box = ``;
  todoList.forEach((item) => {
    item.toLowerCase().includes(searchInput.value.toLowerCase())
      ? (box += `
      <div
                     class="home-item mb-2 rounded-pill text-dark mx-auto w-25 bg-danger d-flex justify-content-between align-items-center">
                     <p id="item" class="m-0 p-0">${item.replace(
                       searchInput.value.toLowerCase(),
                       `<span class="text-warning m-0 p-0">
                         ${searchInput.value.toLowerCase()}
                       </span>`
                     )}</p>
                     <i onclick="deleteItem('${item}')" class="fa-sharp fa-solid fa-trash"></i>
                 </div>`)
      : "";
  });
  homeContent.innerHTML = box;
});
