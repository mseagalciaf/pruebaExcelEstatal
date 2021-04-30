import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  data:any;

  constructor(
    private dataService : DataService
  ) { }

  ngOnInit(): void {
    this.data =this.dataService.getData();
    console.log("los proximos datos viene del service");
    
    console.log(this.data);
    
    
  }


}
