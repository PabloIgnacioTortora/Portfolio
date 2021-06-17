import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { SigninComponent } from './components/login/signin/signin.component'

const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'sobre-mi', component: AboutComponent },
  { path: 'proyectos', component: ProjectsComponent },
  { path: 'crear-proyecto', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactComponent },
  { path: 'proyecto/:id', component: DetailComponent },
  { path: 'login', component: SigninComponent },
  { path: '**', component: ErrorComponent },
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);