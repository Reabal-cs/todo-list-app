
let varOcg = []; 

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function loadTasks() {
  varOcg = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  varOcg.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleComplete(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  varOcg.push({ text, completed: false });
  saveTasks();
  taskInput.value = "";
}

function toggleComplete(index) {
  varOcg[index].completed = !varOcg[index].completed;
  saveTasks();
}

function deleteTask(index) {
  varOcg.splice(index, 1);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(varOcg));
  renderTasks();
}

addBtn.addEventListener("click", addTask);
window.addEventListener("load", loadTasks);
