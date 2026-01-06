import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importar CommonModule para el *ngIf
import { TournamentTableComponent } from '../../components/tournament-table/tournament-table';
import { TournamentCalendar } from '../../components/tournament-calendar/tournament-calendar';
import { RoleAdminComponent } from "../../components/role-admin/role-admin.component";

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [CommonModule, TournamentCalendar, TournamentTableComponent, ],
  
  templateUrl: './tournament-dashboard.html',
  styleUrls: ['./tournament-dashboard.scss']
})
export class TournamentDashboardComponent {

activeTab = signal<'tabla' | 'calendario' | 'equipos' | 'estadisticas'>('tabla');

  setTab(tab: 'tabla' | 'calendario' | 'equipos' | 'estadisticas') {
    this.activeTab.set(tab);

  
  }
}



