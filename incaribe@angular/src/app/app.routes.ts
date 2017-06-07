import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';

const app_routes: Routes = [
    { path: 'projects', component: ProjectsComponent},
    { path: 'projects/:id', component: SingleProjectComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'projects' }
]
    
export const app_routing = RouterModule.forRoot(app_routes);