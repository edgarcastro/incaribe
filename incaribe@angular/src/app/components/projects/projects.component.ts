import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from './projects.service';
import { Project } from './project.model'

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
  project: Project;
  projects: Array<Project>;

  constructor(private router: Router, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.project = new Project();
    this.projects = new Array();
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
