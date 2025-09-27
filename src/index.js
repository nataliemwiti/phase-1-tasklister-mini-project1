document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskContainer = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");
  const userInput = document.getElementById("assigned-user");
  const sortBtn = document.getElementById("sort-tasks");

  let tasks = [];
  let sortAsc = true;

  form.addEventListener("submit", (event) => {
  event.preventDefault(); 

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const assignedTo = userInput.value.trim();

    if (taskText === "") return;

    const newTask = {
      text: taskText,
      priority,
      dueDate,
      assignedTo,
      completed: false
    };

    tasks.push(newTask);
    renderTasks();
    form.reset();
  });

  sortBtn.addEventListener("click", () => {
    sortAsc = !sortAsc;
    renderTasks();
    sortBtn.textContent = sortAsc
      ? "Sort by Priority (Low → High)"
      : "Sort by Priority (High → Low)";
  }); 

  function renderTasks() {
    taskContainer.innerHTML = "";

    const rank = { high: 3, medium: 2, low: 1 };

    const sortedTasks = [...tasks].sort((a, b) => {
      let priorityDiff = sortAsc
        ? rank[a.priority] - rank[b.priority]
        : rank[b.priority] - rank[a.priority];

      if (priorityDiff !== 0) return priorityDiff;

      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

    sortedTasks.forEach((task) => {

      const originalIndex = tasks.indexOf(task);
      const taskDiv = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!task.completed;              
      checkbox.addEventListener("change", () => {
        tasks[originalIndex].completed = checkbox.checked;
        renderTasks();
      });
      taskDiv.appendChild(checkbox);

      const content = document.createElement("span");
      content.textContent = `${task.text} (Assigned to: ${task.assignedTo || "N/A"}, Due: ${task.dueDate || "N/A"})`;
      
      content.style.color = task.completed ? "grey" : getColor(task.priority);

      if (task.completed) content.style.textDecoration = "line-through";
      
      
      taskDiv.appendChild(content);

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.addEventListener("click", () => {
        tasks[i].completed = !tasks[i].completed;
        renderTasks();
      });
      taskDiv.appendChild(completeBtn);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {        
        const newText = prompt("Edit task text:", task.text);
        if (newText) {
          tasks[i].text = newText.trim();
          renderTasks();
        }
      });
      taskDiv.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(i, 1);
        renderTasks();
      });
      taskDiv.appendChild(deleteBtn);

      taskContainer.appendChild(taskDiv);
    });
  }

  function getColor(priority) {
    if (priority === "high") return "red";
    if (priority === "medium") return "orange";
    if (priority === "low") return "green";
    return "black";
  }
});