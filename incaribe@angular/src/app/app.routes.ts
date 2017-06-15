import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';
import { LoginComponent } from './components/login/login.component';

const app_routes: Routes = [
    /*{ path: 'projects', component: ProjectsComponent},*/
    { path: 'projects/:id', component: SingleProjectComponent},
    { path: '**', component: ProjectsComponent}
]
export const appRoutingProviders: any[] =[];
export const app_routing = RouterModule.forRoot(app_routes);