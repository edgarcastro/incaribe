import {Activity} from './activity.model'
export class Project {
    name: String;
    director: String;
    startDate: Date;
    endDate: Date;
    activities: Activity[];

    constructor(){
        this.name = '';
        this.director = ''
        this.startDate = new Date();
        this.endDate = new Date();
        this.activities = [];
    }
}