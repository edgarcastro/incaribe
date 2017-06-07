import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SingleProjectService } from './single-project.service';
import { Project } from './project.model'

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
  providers: [SingleProjectService]
})
export class SingleProjectComponent implements OnInit {
  id: String;
  project: Project;

  constructor(private router: Router, private route: ActivatedRoute, private singleProjectService: SingleProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.load();
    });
  }

  load(){
    this.singleProjectService.getProject(this.id)
    .then(res => {
      if(!res.err){
        this.project = res.project;
      }else{
        console.log(res);
      }
    })
  }

  edit(){
    this.singleProjectService.putProject(this.id, this.project)
    .then(res => {
      console.log(res);
      if(!res.err){
        this.project = res.project;
      }else{
        console.log(res);
      }
    })
  }

  delete(){
    this.singleProjectService.deleteProject(this.id)
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

}
