import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { InformeInterface } from 'src/app/interfaces/informe-interface';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.css']
})
export class LoadFilesComponent implements OnInit {

  isLoading : boolean = false;
  snr_restaurados : Array<any> = [];
  snr_no_restaurados : Array<any> =[];

  dataGeneral: InformeInterface = {
    snr : [],
    panicos : [],
    reacciones : [],
    novedades : [],
    calentamientos : [],
    rondas : []
  };

  dataPrueba : Array<any> = [];
  


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
    this.isLoading = true;
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
            
      const [file] = event.target.files;
      const excelObservable = new Observable((subscriber:Subscriber<any>)=>{
        this.readFile(file,subscriber);
      });
      excelObservable.subscribe((d)=>{
        let result = this.dataService.saveData(d);
        this.isLoading = false;
        
      });

    }

  }

  readFile(file:File,subscriber:Subscriber<any>){
    
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload=(e)=>{
      
      const bufferArray =e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer'});
      const wsnames = wb.SheetNames;
      const wsname = wb.SheetNames[0];

      const wsSnr= XLSX.utils.sheet_to_json(wb.Sheets['SNR']);
      const wsPanicos= XLSX.utils.sheet_to_json(wb.Sheets['PANICOS']);
      const wsReacciones= XLSX.utils.sheet_to_json(wb.Sheets['REACCIONES']);
      const wsNovedades= XLSX.utils.sheet_to_json(wb.Sheets['NOVEDADES']);
      const wsCalentamientos= XLSX.utils.sheet_to_json(wb.Sheets['CALENTAMIENTOS']);
      const wsRondas= XLSX.utils.sheet_to_json(wb.Sheets['RONDAS']);

      this.dataGeneral = {
        snr : wsSnr,
        panicos : wsPanicos,
        reacciones : wsReacciones,
        novedades : wsNovedades,
        calentamientos : wsCalentamientos,
        rondas : wsRondas
      }
      this.snr_restaurados = wsSnr.filter( function (snr) {
        return snr['RESTAURA'];
      });

      this.snr_no_restaurados = wsSnr.filter( function (snr) {
        return snr['NO RESTAURA'];
      });

      subscriber.next("extracción finalizada");
      subscriber.complete();
    }
  }

  

  onSubmit(){

  }


}
