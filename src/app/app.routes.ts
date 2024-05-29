import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PartyListComponent } from './components/party-list/party-list.component';
import { PartyFormComponent } from './components/party-form/party-form.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'parties', component: PartyListComponent,canActivate: [AuthGuard] },
  { path: 'parties/new', component: PartyFormComponent, canActivate: [AuthGuard] },
  { path: 'parties/edit/:id', component: PartyFormComponent, canActivate: [AuthGuard] }
];
