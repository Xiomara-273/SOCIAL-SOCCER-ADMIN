import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../../../infrastructure/services/tournament.service';
import { Tournament, TournamentType } from '../../../../core/models/tournament.model';
import { RoleAdminComponent } from '../../components/role-admin/role-admin.component';

@Component({
  selector: 'app-tournament-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './tournament-admin.html',
  styleUrls: ['./tournament-admin.scss']

})
export class TournamentAdminComponent {
  // Control de UI
  isModalOpen = signal(false);
  
  newTournament: Tournament = this.resetForm();

  constructor(public tournamentService: TournamentService) {}

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
    if (!this.isModalOpen()) this.newTournament = this.resetForm();
  }

  // CREATE: Enviar al servicio
  async saveTournament() {
    await this.tournamentService.create(this.newTournament);
    this.toggleModal(); // Cerrar y limpiar
  }

  // DELETE: Eliminar torneo
  async deleteTournament(id: string | undefined) {
    if (id) await this.tournamentService.delete(id);
  }

  // UPDATE: Avanzar fase
  async nextPhase(id: string | undefined, currentStatus: string) {
    if (!id) return;
    const next = currentStatus === 'inscripciones' ? 'en_curso' : 'finalizado';
    await this.tournamentService.updateStatus(id, next);
  }

  private resetForm(): Tournament {
    return {
      nombre: '',
      tipo: 'liga',
      estado: 'inscripciones',
      fechaInicio: '',
      fechaFin: '',
      premios: '',
      reglas: '',
      cupos: 10,
      costoInscripcion: 0
    };
  }
}