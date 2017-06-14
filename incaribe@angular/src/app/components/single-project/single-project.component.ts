import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model'
import { Activity } from '../../models/activity.model';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
  providers: [ProjectService]
})
export class SingleProjectComponent implements OnInit {
  private chart: any;
  id: String;
  project: Project;
  activity: Activity = new Activity();
  task: Task = new Task();

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService, private AmCharts: AmChartsService) { }

  ngOnInit() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "gantt",
      "theme": "light",
      "marginRight": 70,
      "period": "DD",
      "dataDateFormat": "YYYY-MM-DD",
      "columnWidth": 0.5,
      "valueAxis": {
        "type": "date"
      },
      "brightnessStep": 7,
      "graph": {
        "fillAlphas": 1,
        "lineAlpha": 1,
        "lineColor": "#fff",
        "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
      },
      "rotate": true,
      "categoryField": "category",
      "segmentsField": "segments",
      "colorField": "color",
      "startDateField": "start",
      "endDateField": "end",
      "dataProvider": [],
      "valueScrollbar": {
        "autoGridCount": true
      },
      "chartCursor": {
        "cursorColor": "#55bb76",
        "valueBalloonsEnabled": false,
        "cursorAlpha": 0,
        "valueLineAlpha": 0.5,
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "zoomable": false,
        "valueZoomable": true
      }
    });
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.load();
    });
  }

  ngOnDestroy() {
    this.AmCharts.destroyChart(this.chart);
  }

  load(){
    this.projectService.getProject(this.id)
    .then(res => {
      if(!res.err){
        this.project = res.project as Project;
        this.AmCharts.updateChart(this.chart, () => {
          this.chart.dataProvider = this.serializeActivities(this.project.activity);
        });
      }else{
        console.log(res);
      }
    })
  }

  edit(){
    this.projectService.putProject(this.id, this.project)
    .then(res => {
      console.log(res);
      if(!res.err){
        this.project = res.project;
        this.AmCharts.updateChart(this.chart, () => {
          this.chart.dataProvider = this.serializeActivities(this.project.activity);
        });
        this.activity = new Activity();
        this.task = new Task();
      }else{
        console.log(res);
      }
    })
  }

  delete(){
    this.projectService.deleteProject(this.id)
    .then(res => {
      console.log(res);
      if(!res.err){
        this.project = res.project;
        this.router.navigate(['/projects']);
      }else{
        console.log(res);
      }
    })
  }

  public selectedDate(value: any) {
      this.project.startDate = new Date(value.start);
      this.project.endDate = new Date(value.end);
    }

  public selectedTaskDate(value: any) {
      this.task.start = new Date(value.start);
      this.task.end = new Date(value.end);
    }

  public selectedActivityDate(value: any) {
      this.activity.start = new Date(value.start);
      this.activity.end = new Date(value.end);
    }

  addActivity(activity: Activity){
    this.project.activity.push(activity);
    this.edit();
    this.activity = new Activity();
  }

  deleteActivity(activity: Activity){
    this.project.activity = this.project.activity.filter(x=> x !== activity);
    this.edit();
    this.activity = new Activity();
  }

  addTask(activity: Activity){
    this.activity = this.project.activity.find(x=>{return x == activity});
    this.activity.task.push(this.task);
    this.edit();
  }

  deleteTask(activity: Activity, task: Task){
    this.activity = this.project.activity.find(x=>{return x == activity});
    this.activity.task = this.activity.task.filter(x=> x !== task);
    this.edit();
  }

  back(){
    this.router.navigate(['/projects']);
  }

  upActivity(activity: Activity){
    this.activity = activity;
  }

  private serializeActivities(activities: Activity[]): Object[]{
    let result: Object[] = [];
    let data: Object
    for(let activity of activities) {
      data = {
        "category": activity.name,
        "segments": [ ]
      };
      if(activity.task.length > 0){
        for(let task of activity.task){
          console.log(this.extractDate(task.start));
          data['segments'].push({
            "start": this.extractDate(task.start),
            "end": this.extractDate(task.end),
            "color": "#b9783f",
            "task": task.name
          })
        }
      }
      //Agregar tareas
      result.push(data);
    }
    console.log(result);
    return result;
  }

  private extractDate(date: Date):String{
    date = new Date(date);
    let day = "";
    let month = "";
    if(date.getDay() < 10){
      day = "0";
    }
    if(date.getMonth() < 10){
      month = "0";
    }
    return `${date.getFullYear() }-${month}${date.getMonth()+1}-${day}${date.getDay()}`;
  }

}
