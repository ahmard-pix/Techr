const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
let tasks = [];
addBtn.addEventListener("click", addTask);
filter.addEventListener("change", renderTasks);
function addTask() {
const text = taskInput.value.trim();
if (text.length < 3) {
alert("Task must be at least 3 characters long.");
return;
}
tasks.push({
text: text,
completed: false
});
taskInput.value = "";
renderTasks();
}
function toggleTask(index) {
tasks[index].completed = !tasks[index].completed;
renderTasks();
}
function deleteTask(index, li) {
li.classList.add("removing");
li.addEventListener("animationend", () => {
tasks.splice(index, 1);
renderTasks();
}, { once: true });
}
function renderTasks() {
taskList.innerHTML = "";
const value = filter.value;
tasks.forEach((task, index) => {
if (value === "completed" && !task.completed) {
return;
}
if (value === "pending" && task.completed) {
return;
}
const li = document.createElement("li");
if (task.completed) {
li.classList.add("completed");
}
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;
checkbox.addEventListener("change", () => {
toggleTask(index);
});
const span = document.createElement("span");
span.textContent = task.text;
const deleteBtn = document.createElement("button");
deleteBtn.type = "button";
deleteBtn.className = "deleteBtn";
deleteBtn.setAttribute("aria-label", "Delete task");
deleteBtn.textContent = "\u00D7";
deleteBtn.addEventListener("click", () => {
deleteTask(index, li);
});
li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);
taskList.appendChild(li);
});
}
