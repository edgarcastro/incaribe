import {Component, ElementRef, OnInit, ViewChild, Input} from "@angular/core";
import {Task} from "../../models/task.model"
import {Link} from "../../models/link.model"
import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";


@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {
    @ViewChild("gantt") ganttContainer: ElementRef;
    @Input() data: Task[] = [];
    @Input() links: Link[] = []; 

  constructor() {
    // Datos de ejemplo
    // this.data = [
    //         {id: 1, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
    //         {id: 2, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4}
    //     ];
    // this.links = [
    //     {id: 1, source: 1, target: 2, type: "0"}
    // ];
  }

  ngOnInit() {
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
      console.log(this.serializeTask(item, true));
        });

        gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
          console.log(this.serializeTask(item))
        });

        gantt.attachEvent("onAfterTaskDelete", (id) => {
          console.log(id)
        });

        gantt.attachEvent("onAfterLinkAdd", (id, item) => {
          console.log(this.serializeLink(item, true));
        });

        gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
          console.log(this.serializeLink(item));
        });

        gantt.attachEvent("onAfterLinkDelete", (id) => {
          console.log(id);
        });
  
    gantt.parse({'data': this.data, 'links': this.links});
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
