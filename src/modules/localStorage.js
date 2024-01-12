import { Task } from "./task";
import { Project } from "./project";

export { localMemory, localStorageHandler };

function localStorageHandler() {
  const reCreate = (toDoList) => {
    const newToDoList = [];

    for (let project of toDoList) {
      const newProject = new Project(project.title);
      const taskList = project.task;

      for (let task of taskList) {
        const newTask = new Task(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.status,
        );

        newProject.addTask(newTask);
      }

      newToDoList.push(newProject);
    }

    return newToDoList;
  };

  const addtoStorage = (toDo) => {
    localStorage.setItem("ToDoList", JSON.stringify(toDo));
  }; // adds our list to storage

  const getList = () => {
    if (!localStorage.getItem("ToDoList")) {
      const toDoList = [];
      const defautProject = new Project("default");
      toDoList.push(defautProject);
      localStorage.setItem("ToDoList", JSON.stringify(toDoList));
    }

    const storedList = JSON.parse(localStorage.getItem("ToDoList"));

    const newToDoList = reCreate(storedList);

    return newToDoList;
  };

  const findIndex = (toDoList, projectName) => {
    let index = -1;
    for (let project of toDoList) {
      if (project.title === projectName) {
        index = toDoList.indexOf(project);
      }
    }
    return index;
  };

  const addTask = (taskGiven, project = "default", toDoList) => {
    const num = findIndex(toDoList, project);
    toDoList[num].addTask(taskGiven);
    addtoStorage(toDoList);
  };
  const addProject = (toDoList, project) => {
    const newProject = new Project(`${project}`);
    toDoList.push(newProject);
    addtoStorage(toDoList);
  };

  return { getList, addtoStorage, addTask, addProject };
}

function localMemory() {
  const Handler = localStorageHandler();
  const toDoList = Handler.getList();

  const addTask = (task, project = "default") => {
    Handler.addTask(task, project, toDoList);
  };
  const addNewProject = (project) => {
    Handler.addProject(toDoList, project);
  };
  const update = (toDoList) => {
    Handler.addtoStorage(toDoList);
  };

  return { addTask, toDoList, addNewProject, update };
}
