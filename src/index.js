import "./styles.css";
import { Task } from "./modules/task";
import { compareAsc, format } from "date-fns";
import { Project } from "./modules/project";
import { reTask } from "./modules/localStorage";
import { localMemory } from "./modules/localStorage";

format(new Date(2014, 1, 11), "yyyy-MM-dd");

const date1 = "2024 01 06";
const task1 = new Task("task1","demo task",date1,"high");

const newList = localMemory();

console.log(newList.toDoList);

newList.addTask(task1,"default");


console.log(newList.toDoList);



