import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConfigurationsService } from './services/configurations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'permisosICSIC';

  constructor(
    private _ConfigurationsService: ConfigurationsService
  ) {

    
  }

}
