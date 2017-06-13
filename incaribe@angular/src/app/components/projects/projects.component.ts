import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ProjectsService } from './projects.service';
import { Project } from '../../models/project.model'


@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
  project: Project;
  projects: Project[] = [];
  date: DateModel;
  options: DatePickerOptions;
  public sortBy = "name";
  public sortOrder = "asc";

  constructor(private router: Router, private projectsService: ProjectsService) { 
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    this.project = new Project();
    this.load();
  }

  load(){
    this.projectsService.projects
    .then(res => {
      if(!res.error){
        console.log(res.projects);
        this.projects = res.projects;
      }else{
        console.log(res);
      }
    })
  }

  detail(id: String){
    this.router.navigate(['/', id]);
  }

  save(){
    console.log(this.project);
    this.projectsService.postProject(this.project)
      .then(res =>{
        
        if(!res.error){
        console.log(res.project);
        this.projects.push(res.project);
      }else{
        console.log(res);
      }
      });
  }

}
