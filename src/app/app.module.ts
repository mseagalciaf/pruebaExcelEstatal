import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadFilesComponent } from './components/load-files/load-files.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ShowChartsComponent } from './components/show-charts/show-charts.component'

@NgModule({
  declarations: [
    AppComponent,
    LoadFilesComponent,
    NavbarComponent,
    DataTableComponent,
    ShowChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule,
    ChartsModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
