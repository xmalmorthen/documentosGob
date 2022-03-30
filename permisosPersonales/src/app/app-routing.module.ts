import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES
import { FormatoComponent } from './pages/formato/formato.component';
import { TokenExistGuard } from './guards/token-exist.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { TokenValidGuard } from './guards/token-valid.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'formato',
    pathMatch: 'full',    
  },
  { 
    path: 'formato', 
    component: FormatoComponent,
    canActivate: [ TokenExistGuard, TokenValidGuard ]
  },
  { 
    path: 'identificarse', 
    component: AuthComponent,
    canActivate: [  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
