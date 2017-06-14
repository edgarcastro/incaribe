import {Task} from './task.model';
import {Link} from './link.model';

export class Project {
    _id: String;
    name: String;
    director: String;
    startDate: Date;
    endDate: Date;
    tasks: Task[];
    dependencies: Link[]

    constructor(){
        this.name = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.tasks = [];
        this.dependencies = [];
    }
}