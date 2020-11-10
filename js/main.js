class Task {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
  }
}

let tasks = [];

window.onload = function () {
  taskOne = new Task("Köpa födelsedagspresent till min sambo", false);
  taskTwo = new Task("Köpa julklappar", false);
  taskThree = new Task("Städa", false);
  taskFour = new Task("Klippa mig", false);
  taskFive = new Task("Göra inlämningsuppgift", false);

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
    let task = document.getElementById("newTaskValue").value;
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

    let checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.value = tasks[i].name;
    checkBoxElement.id = "toDo" + i;

    let labelElement = document.createElement("label");
    labelElement.innerText = tasks[i].name;
    labelElement.htmlFor = "toDo" + i;

    let removeIconElement = document.createElement("span");
    removeIconElement.className = "fas fa-times-circle fa-lg ml-auto m-2";

    liElement.appendChild(checkBoxElement);
    liElement.appendChild(labelElement);
    liElement.appendChild(removeIconElement);

    if (tasks[i].completed === false) {
      currentList.appendChild(liElement);
    } else {
      doneList.appendChild(liElement);
    }

    checkBoxElement.addEventListener("click", () => {
      changeState(tasks[i]);
    });
    removeIconElement.addEventListener("click", () => {
      removeTask(tasks[i]);
    });
  }

  currentListDiv.appendChild(currentList);
  doneListDiv.appendChild(doneList);
}

function changeState(object) {
  if (object.completed === false) {
    object.completed = true;
  } else {
    object.completed = false;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderHTML();
}

function removeTask(object) {
  for (let i = 0; i < tasks.length; i++) {
    if (object.name === tasks[i].name) {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
  renderHTML();
}

function addTask(task) {
  let newTask = new Task(task, false);
  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderHTML();
}

function sortTasks(value) {
  if (value === "ascending") {
    tasks.sort((a, b) => {
      let one = a.name.toLowerCase();
      let two = b.name.toLowerCase();
      if (one < two) {
        return -1;
      }
      if (one > two) {
        return 1;
      }
      return 0;
    });
  } else {
    tasks.sort((a, b) => {
      let one = a.name.toLowerCase();
      let two = b.name.toLowerCase();
      if (one > two) {
        return -1;
      }
      if (one < two) {
        return 1;
      }
      return 0;
    });
  }
  // localStorage.setItem("tasks", JSON.stringify(tasks));

  renderHTML();
}
