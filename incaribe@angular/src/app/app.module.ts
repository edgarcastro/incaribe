import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GanttModule } from 'ng2-gantt';

import { AppComponent } from './app.component';
import { GanttChartComponent } from './components/gantt-chart/gantt-chart.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';

import { app_routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    GanttChartComponent,
    ProjectsComponent,
    SingleProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GanttModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
