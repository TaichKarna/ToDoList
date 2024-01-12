export { domStuff };
import { sub } from "date-fns";
import { createDiv, createImageDiv } from "./helperFunctions";
import { localMemory } from "./localStorage";
import { Task } from "./task";
import Edit from "../images/edit.svg";
import Priority from "../images/flag.svg";
import Delete from "../images/delete.svg";

function dialogHandler(memory) {
  //add-project dialog
  const addProject = document.querySelector("#add-project");
  const showBtnProject = document.querySelector(".add-project .symbol");
  const xbtnProject = addProject.querySelector(".close");
  const submitBtnProject = addProject.querySelector(".project-button");
  const projectName = addProject.querySelector(".form-main input");

  const addTask = document.querySelector("#add-task");
  const showBtnTask = document.querySelector("#add");
  const xbtnTask = addTask.querySelector(".close");
  const submitBtnTask = addTask.querySelector(".task-button");
  const closeBtnTask = addTask.querySelector(".cancel");

  const title = addTask.querySelector("#title");
  const description = addTask.querySelector("#description");
  const dueDate = addTask.querySelector("#dueDate");
  const priority = addTask.querySelector("#priority");
  const projectFolder = addTask.querySelector("#projects");

  showBtnProject.addEventListener("click", () => {
    addProject.showModal();
  });

  xbtnProject.addEventListener("click", () => {
    addProject.close();
  });

  submitBtnProject.addEventListener("click", (e) => {
    e.preventDefault();
    const newProject = projectName.value;

    if (newProject.length > 1) {
      memory.addNewProject(newProject);
      projectName.value = "";
    }
    addProject.close();
  });

  //task even listeners
  showBtnTask.addEventListener("click", () => {
    addTask.showModal();
    projectList(memory.toDoList, projectFolder);
  });

  closeBtnTask.addEventListener("click", (e) => {
    e.preventDefault();
    addTask.close();
  });

  xbtnTask.addEventListener("click", (e) => {
    e.preventDefault();
    addTask.close();
  });

  submitBtnTask.addEventListener("click", (e) => {
    const newTask = new Task(
      title.value,
      description.value,
      dueDate.value,
      priority.value,
    );
    memory.addTask(newTask, projectFolder.value);
    addTask.close();
  });
}

function projectList(toDoList, selectEle) {
  const projectDisplay = document.querySelector(".project-display");
  for (let project of toDoList) {
    //add to task dialog
    const newElement = document.createElement("option");
    newElement.textContent = `${project.title}`;
    newElement.setAttribute("value", `${project.title}`);
    selectEle.appendChild(newElement);
  }
}

function displayProject(toDoList) {
  const projectDisplay = document.querySelector(".project-display");
  for (let project of toDoList) {
    const projectTitle = createDiv("project-titles");
    const liEle = document.createElement("li");
    liEle.textContent = `${project.title}`;
    liEle.setAttribute("id", `${project.title}`);
    projectTitle.appendChild(liEle);
    projectDisplay.appendChild(projectTitle);
  }
}

function createTask(project, toDoList) {
  const findIndex = (toDoList, projectName) => {
    let index = -1;
    for (let project of toDoList) {
      if (project.title === projectName) {
        index = toDoList.indexOf(project);
      }
    }
    return index;
  };
  const index = findIndex(toDoList, project);
  const tasks = toDoList[index].task;

  const taskContainer = document.querySelector(".task-container");
  for (let task of tasks) {
    console.log(task);
    const taskCard = createDiv("task");

    const taskMain = createDiv("task-main");

    const taskInfo = createDiv("task-info");

    //info
    const info = createDiv("info");
    //status
    const status = createDiv("status");
    const inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    inputEle.checked = task.status;

    status.appendChild(inputEle);
    info.appendChild(status);
    //created Title
    const title = createDiv("title");
    title.textContent = task.title;
    info.appendChild(status);
    info.appendChild(title);

    //options
    const options = createDiv("options");

    const edit = createImageDiv("edit", Edit);
    const priority = createImageDiv("priority", Priority);
    const deleteBtn = createImageDiv("delete", Delete);
    options.append(edit, priority, deleteBtn);

    taskMain.appendChild(info);
    taskMain.appendChild(options);

    //task-expand

    const taskExpand = taskExpandCreate(task);
    taskCard.append(taskMain);

    taskContainer.appendChild(taskCard);

    taskCard.addEventListener("click", () => {
      const ele = taskCard.querySelector(".task-expand");
      if (ele !== null) {
        taskCard.removeChild(ele);
      } else {
        taskCard.append(taskExpand);
      }
    });

    deleteBtn.addEventListener("click", () => {
      const num = tasks.indexOf(task);
      tasks.splice(num, 1);
      taskContainer.removeChild(taskCard);
      const memory = localMemory();

      memory.update(toDoList);
    });
  }
}
function taskExpandCreate(task) {
  const taskExpand = createDiv("task-expand");
  const title = CreateInfoCard("Title", task.title);
  const dueDate = CreateInfoCard("Due Date:", task.dueDate);
  const description = CreateInfoCard("Description:", task.description);
  const priority = CreateInfoCard("priority:", task.priority);
  taskExpand.append(title, dueDate, description, priority);
  return taskExpand;
}
function CreateInfoCard(headValue, infoValue) {
  const infoCard = createDiv("info-card");
  const heading = createDiv("heading");
  heading.textContent = headValue;
  const info = createDiv("info");
  info.textContent = infoValue;
  infoCard.append(heading, info);
  return infoCard;
}

function taskDisplay(memory) {
  //display projects list on click
  const projectBox = document.querySelector(".menu-item #projects");
  let displaying = false;
  const projectDisplay = document.querySelector(".project-display");
  const projectTitle = document.querySelector(".project-title");

  projectBox.addEventListener("click", (e) => {
    if (!displaying) {
      displayProject(memory.toDoList);
      displaying = true;
    } else {
      displaying = false;
      projectDisplay.replaceChildren();
    }
  });

  projectDisplay.addEventListener("click", (e) => {
    if (displaying) {
      const projectName = e.target.textContent;
      projectTitle.textContent = projectName;
      document.querySelector(".task-container").replaceChildren();
      createTask(projectName, memory.toDoList);
    }
  });
}

function domStuff() {
  const memory = localMemory();
  inboxDisplay(memory.toDoList);
  dialogHandler(memory);
  taskDisplay(memory);
}

function inboxDisplay(toDoList) {
  toDoList.forEach((element) => {
    createTask(element.title, toDoList);
  });
  const projectTitle = document.querySelector(".project-title");
  projectTitle.textContent = "Inbox";

  const inbox = document.querySelector("#inbox");
  inbox.addEventListener("click", () => {
    projectTitle.textContent = "Inbox";
    toDoList.forEach((element) => {
      createTask(element.title, toDoList);
    });
  });
}
