let homeContent = document.getElementById("homeContent");
let Count = document.getElementById("count_items");
let todoList = JSON.parse(localStorage.getItem("toDo")) || [];

display();
displayCount();
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
  countNum = todoList.length;
  display();
  displayCount();
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
function displayCount() {
  let countNum = todoList.length || 0;
  Count.innerHTML = `Topics : ${countNum}`;
}
function deleteItem(item) {
  todoList.splice(todoList.indexOf(item), 1);
  localStorage.setItem("toDo", JSON.stringify(todoList));
  display();
  displayCount();
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

const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");

let audio = document.getElementById("myAudio"); // Try to get existing audio element
if (!audio) {
  audio = document.createElement("audio");
  audio.id = "myAudio"; // Give it an ID so we can reuse it
  document.body.appendChild(audio); // Add it to the page (hidden)
}
// 2. Set the audio source (you can use different audio formats)
audio.src = "./sound.wav";
audio.loop = true;

function showCustomAlert(message) {
  // Set the alert message
  alertMessage.textContent = message;

  // Show the custom alert
  customAlert.style.display = "flex";

  // Handle the OK button click
  document.getElementById("alertOK").onclick = function () {
    customAlert.style.display = "none"; // Hide the alert
    stopAlertWithSound();
  };
}

// Example usage

let time = 30 * 60 * 1000;

setInterval(() => {
  if (todoList.length > 0) {
    showAlertWithSound();
    showCustomAlert(todoList[0]);
  }
}, time);

function showAlertWithSound() {
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
}

function stopAlertWithSound() {
  audio.pause();
  audio.currentTime = 0;
}
