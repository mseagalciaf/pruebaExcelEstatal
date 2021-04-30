import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.css']
})
export class LoadFilesComponent implements OnInit {

  public checkoutForm = this.formBuilder.group({
    file : [null, Validators.required]
  })

  

  constructor(
    private formBuilder : FormBuilder,
    private cd: ChangeDetectorRef,
    private router : Router,
    private dataService : DataService
  ) { }

  ngOnInit(): void {
    
  }

  

  onFileChange(event) {

    //-------Lectura de archivos-------------
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
            
      const [file] = event.target.files;
      const excelObservable = new Observable((subscriber:Subscriber<any>)=>{
        this.readFile(file,subscriber);
      });
      excelObservable.subscribe((d)=>{
        let result = this.dataService.saveData(d);
        if (result) {
          this.router.navigate(['showdata']);
        }else{
          return "error";
        }
        
      });

    }

  }

  readFile(file:File,subscriber:Subscriber<any>){
    
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload=(e)=>{
      
      const bufferArray =e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer'});
      const wsname = wb.SheetNames[0];
      const ws: XLSX.WorkSheet= wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      subscriber.next(data);
      subscriber.complete();
    }
  }

  onSubmit(){

  }


}
