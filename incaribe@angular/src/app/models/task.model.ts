export class Task {
    name: String;
    manger: String;
    start: Date;
    end: Date;
    _before: String;
    _next: String;
    materials: any[];
    equipements: any[]; 
    comments : any[]

    constructor() {
        this.name = "";
        this.start = new Date();
        this.end = new Date();
        this.materials = [];
        this.equipements = [];
        this.comments = [];
    }
}
