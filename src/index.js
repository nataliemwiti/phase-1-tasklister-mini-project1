document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskContainer = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");
  const userInput = document.getElementById("assigned-user");
  const sortBtn = document.getElementById("sort-tasks");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const assignedTo = userInput.value.trim();

    if (taskText === "") return;

    tasks.push(task);
    renderTasks();
    form.reset();
  });

   sortBtn.addEventListener("click", () => {
    sortAsc = !sortAsc;
    renderTasks();
  });

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.textContent = taskText + "";

    const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "5px";
        editBtn.onclick = () => {
          const newText = prompt("Edit task text:", task.text);
          if (newText) {
            tasks[i].text = newText.trim();
            renderTasks();
          }
        };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      taskItem.remove();
    });

    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    taskContainer.appendChild(taskItem);

    form.reset(); 

    function getColor(priority) {
    if (priority === "high") return "red";
    if (priority === "medium") return "orange";
    return "green";
  }
});
  });
