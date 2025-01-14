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

  todoItems.unshift({
    title: textElement.value,
    isDone: false,
  });

  saveAllItemstoLocalStorage();
  render();

  textElement.value = "";
};

// const remove = (itemToRemove) => {
//   const indexToRemove = todoItems.indexOf(itemToRemove);
//   todoItems.splice(indexToRemove, 1);
//   saveAllItemstoLocalStorage();
//   render();
// };

const remove = (itemTitleToRemove) => {
  let toBeRemovedIndex = todoItems.findIndex(
    (item) => item.title === itemTitleToRemove
  );
  todoItems.splice(toBeRemovedIndex, 1);
  saveAllItemstoLocalStorage();
  render();
};

const render = () => {
  const ul = document.getElementById("todoListItems");

  ul.innerHTML = "";

  const sortedItems = todoItems.sort((a, b) => a.isDone - b.isDone);

  let index = 1;
  for (const item of sortedItems) {
    const li = document.createElement("li");
    li.classList = "list-group-item";
    li.innerHTML = `
    <div class="row" title='${item.title}'>
        <div class="task col-10" >
           
            <input
                onchange="changeStatus(this)"
                id='item-${index}'
                class="form-check-input rounded-circle me-2"
                type="checkbox"
                value="${item.title}"
                ${item.isDone ? "checked" : ""}
                value="${item.title}"
                ${item.isDone ? "checked" : ""}
            />
             <label class="form-check-label" for='item-${index}'>
              ${item.title}
            </label>
           
        </div>

        <div
            class="icons col-2 d-flex justify-content-end align-items-center"
        >
            <button class="btn" type="button" onclick="remove('${item.title}')">
            <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    `;
    ul.appendChild(li);
    index++;
  }
};

const changeStatus = (input) => {
  let matchElement = todoItems.find((item) => item.title === input.value);
  matchElement.isDone = input.checked;

  saveAllItemstoLocalStorage();
  render();

  const elementToScroll =
    document.getElementById("todoListItems").parentElement;

  elementToScroll.scrollBy({
    top: elementToScroll.scrollHeight,
    behavior: "smooth",
  });
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
