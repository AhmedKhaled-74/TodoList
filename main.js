let homeContent = document.getElementById("homeContent");
let todoList = JSON.parse(localStorage.getItem("toDo")) || [];
display();

let userInput = document.getElementById("userInput");
let searchInput = document.getElementById("searchInput");

function addItem() {
  const inputValues = userInput.value.split(",");

  inputValues.forEach((value) => {
    const trimmedValue = value.trim(); // Remove leading/trailing whitespace
    if (trimmedValue !== "") {
      // Avoid adding empty strings
      todoList.push(trimmedValue);
    }
  });
  localStorage.setItem("toDo", JSON.stringify(todoList));
  userInput.value = "";
  display();
}

function display() {
  let cartona = "";
  todoList.forEach((item) => {
    cartona += `
     <div
                    class="home-item mb-2 rounded-pill text-dark mx-auto  bg-light d-flex justify-content-between align-items-center">
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
                     class="home-item mb-2 rounded-pill text-dark mx-auto  bg-light d-flex justify-content-between align-items-center">
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
let time = 30 * 60 * 1000;
setInterval(() => {
  if (todoList.length > 0) {
    showAlertWithSound();
    setTimeout(() => {
      alert(todoList[0]);
    }, 500);
  }
}, time);

function showAlertWithSound() {
  // 1. Create an audio element (if it doesn't already exist)
  let audio = document.getElementById("myAudio"); // Try to get existing audio element
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "myAudio"; // Give it an ID so we can reuse it
    document.body.appendChild(audio); // Add it to the page (hidden)
  }

  // 2. Set the audio source (you can use different audio formats)
  audio.src = "./sound.wav";

  // 3. Play the sound
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
}
