import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DataTableModule } from "angular2-datatable";
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';

import { app_routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    SingleProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Daterangepicker,
    DataTableModule,
    AmChartsModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
