import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit, Input } from '@angular/core';

// PIPES
import { FechaPermisoTransformPipe } from '../../../pipes/fecha-permiso-transform.pipe';

// INTERFACES
import { formatoModelInterface } from '../../../interfaces/formato.interface';

@Component({
  selector: 'app-format-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, AfterViewInit {

  @Output('backToEdit') backToEditEvt = new EventEmitter<boolean>();
  @Input('infoModel') public infoModel: formatoModelInterface | null = null;

  constructor(
  ) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  public backToEdit(evt: any){
    this.backToEditEvt.emit(true);
  }
  
  public downloadAsPDF(evt: any) {

    window.print();

  }

}
