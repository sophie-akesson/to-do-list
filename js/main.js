class Task {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
  }
}

let tasks = [];

window.onload = function () {
  taskOne = new Task("Buy birthday gifts for my SO", false);
  taskTwo = new Task("Buy christmas gifts", false);
  taskThree = new Task("Clean my apartment", false);
  taskFour = new Task("Get a haircut", false);
  taskFive = new Task("Do the javascript assignment", false);

  tasks.push(taskOne, taskTwo, taskThree, taskFour, taskFive);

  if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let addTaskButton = document.getElementById("addTaskButton");
  let sortAsc = document.getElementById("sortAsc");
  let sortDesc = document.getElementById("sortDesc");

  addTaskButton.addEventListener("click", () => {
    let task = document.getElementById("newTaskInput").value;
    addTask(task);
  });

  sortAsc.addEventListener("click", () => {
    sortTasks(sortAsc.value);
  });

  sortDesc.addEventListener("click", () => {
    sortTasks(sortDesc.value);
  });

  renderHTML();
};

function renderHTML() {
  let currentListDiv = document.getElementById("currentListWrapper");
  let doneListDiv = document.getElementById("doneListWrapper");

  currentListDiv.innerHTML = "";
  doneListDiv.innerHTML = "";

  let currentList = document.createElement("ul");
  currentList.id = "currentList";

  let doneList = document.createElement("ul");
  doneList.id = "doneList";

  for (let i = 0; i < tasks.length; i++) {
    let liElement = document.createElement("li");
    
    let labelElement = document.createElement("label");
    labelElement.innerText = tasks[i].name;
    labelElement.htmlFor = "toDo" + i;
    labelElement.className = "taskLabel";

    let checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.value = tasks[i].name;
    checkBoxElement.id = "toDo" + i;

    let checkBoxSpan = document.createElement("span");
    checkBoxSpan.className = "checkBoxSpan";

    let removeIconSpan = document.createElement("span");
    removeIconSpan.className = "fas fa-times-circle fa-lg";

    liElement.appendChild(labelElement);
    labelElement.appendChild(checkBoxElement);
    labelElement.appendChild(checkBoxSpan);
    liElement.appendChild(removeIconSpan);

    let lineElement = document.createElement("hr");

    if (tasks[i].completed === false) {
      currentList.appendChild(liElement);
      currentList.appendChild(lineElement);
    } else {
      checkBoxElement.checked = "true";
      doneList.appendChild(liElement);
      doneList.appendChild(lineElement);
    }

    checkBoxElement.addEventListener("click", () => {
      changeState(tasks[i]);
    });
    removeIconSpan.addEventListener("click", () => {
      removeTask(tasks[i]);
    });
  }

  currentListDiv.appendChild(currentList);
  doneListDiv.appendChild(doneList);
}

function fadeHTML(object) {
  let liElements = wrapper.querySelectorAll("li");

  for (let item of liElements) {
    let taskText = item.innerText;

    if (object.name === taskText) {
      item.style.opacity = 0;

      setTimeout(() => {
        item.innerHTML = "";
        item.remove();
        renderHTML();
      }, 400);
    }
  }
}

function changeState(object) {
  if (object.completed === false) {
    object.completed = true;
  } else {
    object.completed = false;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  fadeHTML(object);
}

function removeTask(object) {
  for (let i = 0; i < tasks.length; i++) {
    if (object.name === tasks[i].name) {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  fadeHTML(object);
}

function addTask(task) {
  let newTask = new Task(task, false);
  tasks.push(newTask);

  document.getElementById("newTaskInput").value = "New task";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderHTML();
}

function sortTasks(value) {
  if (value === "ascending") {
    tasks.sort((firstObject, secondObject) => {
      let firstObjectName = firstObject.name.toLowerCase();
      let secondObjectName = secondObject.name.toLowerCase();
      if (firstObjectName < secondObjectName) {
        return -1;
      }
      if (firstObjectName > secondObjectName) {
        return 1;
      }
      return 0;
    });
  } else {
    tasks.sort((firstObject, secondObject) => {
      let firstObjectName = firstObject.name.toLowerCase();
      let secondObjectName = secondObject.name.toLowerCase();
      if (firstObjectName > secondObjectName) {
        return -1;
      }
      if (firstObjectName < secondObjectName) {
        return 1;
      }
      return 0;
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderHTML();
}
