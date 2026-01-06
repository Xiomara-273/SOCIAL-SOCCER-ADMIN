import { Injectable, signal } from '@angular/core';
import { Role } from '../../core/models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  // Iniciamos con los roles que pedía tu captura
  private rolesSignal = signal<Role[]>([
    { id: 1, nombre: 'Admin general', permisos: 'Acceso total al sistema' },
    { id: 2, nombre: 'Admin cancha', permisos: 'Gestión de horarios y reservas' },
    { id: 3, nombre: 'Árbitro', permisos: 'Registro de resultados' }
  ]);
  
  public roles = this.rolesSignal.asReadonly();

  add(role: Role) {
    this.rolesSignal.update(list => [...list, role]);
  }

  remove(id: number) {
    this.rolesSignal.update(list => list.filter(r => r.id !== id));
  }

  update(updatedRole: Role) {
    this.rolesSignal.update(list => 
      list.map(r => r.id === updatedRole.id ? updatedRole : r)
    );
  }
}