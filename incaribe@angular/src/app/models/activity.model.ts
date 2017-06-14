import {Task} from "./task.model"
export class Activity {
    name: String;
    start: Date;
    end: Date;
    _before: String;
    _next: String;
    task: Task[];

    constructor(){
        this.name = '';
        this.start = new Date();
        this.end = new Date();
        this.task = [];
    }
}

