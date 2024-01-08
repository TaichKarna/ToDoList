//A singular  Project and default project object logic
export {Project};

class Project{
    task = [];
    constructor(title){
        this.title = title;
        this.task = [];
    }

    addTask(Task){
        this.task.push(Task);
    }

}