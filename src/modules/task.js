//A singular ToDo Task 
import cL from "./logger";
export {Task};

class Task{

    constructor(title,description,dueDate,priority,status=false)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;  //task completed or not // false if its not
    }

    updateStatus(){
        this.status?this.status = false : this.status = true;
    }
}
