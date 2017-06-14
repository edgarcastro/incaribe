import {Component, ElementRef, OnInit, ViewChild, Input} from "@angular/core";
import { ProjectService } from '../../services/project.service';
import {Project} from "../../models/project.model";
import {Task} from "../../models/task.model"
import {Link} from "../../models/link.model"
import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";


@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
  providers: [ProjectService]
})
export class GanttChartComponent implements OnInit {
    @ViewChild("gantt") ganttContainer: ElementRef;
    @Input() project: Project = new Project();
    private task: Task = new Task();
    private link: Link = new Link();

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    console.log(this.project);
    gantt.config.start_date = this.project.startDate;
    gantt.config.end_date = this.project.endDate;
    gantt.config.columns=[
      {name:"text",       label:"Nombre",  tree:true, width:'*' },
      {name:"start_date", label:"Inicio", align: "center" },
      {name:"duration",   label:"Duración",   align: "center" },
      {name:"add",        label:"" }
    ];
    gantt.config.autosize = "y";
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.init(this.ganttContainer.nativeElement);

    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
      this.project.tasks.push(this.serializeTask(item, true));
      this.projectService.putProject(this.project._id, this.project)
      .then(res=>{
        console.log(res);
      })
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
      console.log(this.serializeTask(item));
    });

    gantt.attachEvent("onAfterTaskDelete", (id) => {
      console.log(id);
      this.project.tasks = this.project.tasks.filter(item => item.id !== id);
      this.projectService.putProject(this.project._id, this.project)
      .then(res=>{
        console.log(res);
      })
    });

    gantt.attachEvent("onAfterLinkAdd", (id, item) => {
      this.project.dependencies.push(this.serializeLink(item, true));
      this.projectService.putProject(this.project._id, this.project)
      .then(res=>{
        console.log(res);
      })
    });

    gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
      console.log(this.serializeLink(item));
    });

    gantt.attachEvent("onAfterLinkDelete", (id) => {
      console.log(id);
      this.project.dependencies = this.project.dependencies.filter(item => item.id !== id);
      this.projectService.putProject(this.project._id, this.project)
      .then(res=>{
        console.log(res);
      })
    });
  
    gantt.parse({'data': this.project.tasks, 'links': this.project.dependencies});
  }

    private serializeTask(data: any, insert: boolean = false): Task {
        return this.serializeItem(data, insert) as Task;
    }

    private serializeLink(data: any, insert: boolean = false): Link {
        return this.serializeItem(data, insert) as Link;
    }

    private serializeItem(data: any, insert: boolean): any{
        var result = {};

        for (let i in data) {
            if (i.charAt(0) == "$" || i.charAt(0) == "_") continue;
            if(insert && i == "id") continue;
            if (data[i] instanceof Date) {
                result[i] = gantt.templates.xml_format(data[i]);
            }
            else {
                result[i] = data[i];
            }
        }

        return result;
    }


}
