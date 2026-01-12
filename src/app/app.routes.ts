import { Routes } from '@angular/router';
import { TournamentAdminComponent } from './modules/tournaments/pages/tournament-admin/tournament-admin';
import { EnrollmentAdminComponent } from './modules/tournaments/pages/enrollment-admin/enrollment-admin';
import { TournamentDashboardComponent } from './modules/tournaments/pages/tournament-dashboard/tournament-dashboard';
import { RoleAdminComponent } from './modules/tournaments/components/role-admin/role-admin.component';
import { TeamManagementComponent } from './modules/tournaments/components/team-management/team-management';
import { PartidosComponent } from './modules/tournaments/pages/partidos/partidos.component';

export const routes: Routes = [
  { path: 'roles-admin', component: RoleAdminComponent },
  { path: 'admin/tournaments', component: TournamentAdminComponent },
  { path: 'admin/enrollments', component: EnrollmentAdminComponent },
  { path: 'dashboard', component: TournamentDashboardComponent }, 
  { path: 'equipos', component: TeamManagementComponent },
  { path: 'partidos', component: PartidosComponent },
  { 
    path: 'configuracion', 
    loadComponent: () => import('./modules/configuracion/configuracion').then(m => m.ConfiguracionComponent) 
  },
  // Solo una ruta por defecto
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' } 
];