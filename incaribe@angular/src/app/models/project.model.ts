import {Activity} from './activity.model';

export class Project {
    _id: String;
    name: String;
    director: String;
    startDate: Date;
    endDate: Date;
    activity: Activity[];

    constructor(){
        this.name = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.activity = [];
    }
}