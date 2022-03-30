import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import { DividerModule } from "primeng/divider";
import { CalendarModule } from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { SkeletonModule } from "primeng/skeleton";
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es'

// COMPONENTES
import { AuthComponent } from './pages/auth/auth.component';
import { FormatoComponent } from './pages/formato/formato.component';

// SERVICES
import { ConfigurationsService } from './services/configurations.service';
import { TokenService } from './services/token.service';
import { PreviewComponent } from './pages/formato/preview/preview.component';
import { FechaPermisoTransformPipe } from './pipes/fecha-permiso-transform.pipe';
import { DiasTransformPipe } from './pipes/dias-transform.pipe';
import { HorarioTransformPipe } from './pipes/horario-transform.pipe';
import { HorasTransformPipe } from './pipes/horas-transform.pipe';



@NgModule({
  declarations: [
    AppComponent,
    FormatoComponent,
    AuthComponent,
    PreviewComponent,
    FechaPermisoTransformPipe,
    DiasTransformPipe,
    HorarioTransformPipe,
    HorasTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MessagesModule,
    MessageModule,
    RippleModule,
    DividerModule,
    CalendarModule,
    ProgressSpinnerModule,
    SkeletonModule,
    DropdownModule,
    InputTextareaModule,
    MomentModule,
  ],
  providers: [
    ConfigurationsService,
    TokenService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
