const addToDoButton = document.querySelector("#btnAdd");

let index = 1;

const Add = () => {
  const textToBeAdded = document.querySelector("#inputText");
  if (textToBeAdded.value === "") {
    alert("please creat a todo!");
    return;
  }
  const li = document.createElement("li");
  li.classList = "list-group-item";

  li.innerHTML = `<div class="row">
    <div class="task col-10">
      <input
        class="form-check-input rounded-circle me-2"
        type="checkbox"
        value=""
        id="checkbox-${index}"
      />
      <label class="form-check-label" for="checkbox-${index}">
        ${textToBeAdded.value}
      </label>
    </div>
  
    <div
      class="icons col-2 d-flex justify-content-end align-items-center"
    >
      <button class="btn" type="button" onclick="remove()">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>`;

  const ul = document.querySelector("#toDoList");
  ul.appendChild(li);
  index++;
  textToBeAdded.value = "";
};

const remove = () => {
  alert("you have to pay me to remove this:D");
};
