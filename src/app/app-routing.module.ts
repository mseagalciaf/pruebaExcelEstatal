import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { LoadFilesComponent } from './components/load-files/load-files.component';
import { ShowChartsComponent } from './components/show-charts/show-charts.component';

const routes: Routes = [
  {
    path: 'loadfiles', component: LoadFilesComponent
  },
  {
    path: 'showdata', component: DataTableComponent
  },
  {
    path: 'showcharts', component: ShowChartsComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
