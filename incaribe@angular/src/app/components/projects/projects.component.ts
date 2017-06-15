import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model'


@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  project: Project;
  projects: Project[] = [];
  public sortBy = "name";
  public sortOrder = "asc";

  constructor(private router: Router, private projectService: ProjectService) { 
  }

  ngOnInit() {
    this.project = new Project();
    this.load();
  }

  load(){
    this.projectService.all
    .then(res => {
      if(!res.error){
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
    this.projectService.postProject(this.project)
      .then(res =>{
        if(!res.error){
        this.projects.push(res.project);
      }else{
        console.log(res);
      }
      });
  }

  public selectedDate(value: any) {
      this.project.startDate = new Date(value.start);
      this.project.endDate = new Date(value.end);
    }

}
