export class Project {
    name: String;
    director: String;
    startDate: Date;
    endDate: Date;

    constructor(){
        this.name = '';
        this.director = ''
        this.startDate = new Date();
        this.endDate = new Date();
    }
}