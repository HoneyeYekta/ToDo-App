let todoItems = [];

const addNewToDoItem = () => {
  let textElement = document.getElementById("todoText");

  if (textElement.value === "") {
    alert("entering the todo text is mandatory");
    return;
  }

  const isItemAlreadyExist = todoItems.some(
    (item) => item.title === textElement.value
  );

  if (isItemAlreadyExist) {
    alert("the item you've entered is already exist!");
    return;
  }

  todoItems.push({
    title: textElement.value,
    isDone: false,
  });

  saveAllItemstoLocalStorage();
  render();

  textElement.value = "";
};

const remove = (itemToRemove) => {
  const indexToRemove = todoItems.indexOf(itemToRemove);
  todoItems.splice(indexToRemove, 1);
  saveAllItemstoLocalStorage();
  render();
};

const render = () => {
  const ul = document.getElementById("todoListItems");

  ul.innerHTML = "";

  for (const item of todoItems) {
    const li = document.createElement("li");
    li.classList = "list-group-item";
    li.innerHTML = `
    <div class="row">
        <div class="task col-10">
            <label class="form-check-label">
            <input
                class="form-check-input rounded-circle me-2"
                type="checkbox"
                value=""
            />
           ${item.title}
            </label>
        </div>

        <div
            class="icons col-2 d-flex justify-content-end align-items-center"
        >
            <button class="btn" type="button" onclick="remove('${item}')">
            <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    `;
    ul.appendChild(li);
  }
};

const saveAllItemstoLocalStorage = () => {
  localStorage.setItem("items", JSON.stringify(todoItems));
};

window.onload = () => {
  if (localStorage.getItem("items")) {
    todoItems = JSON.parse(localStorage.getItem("items"));
    render();
  }
};
