import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../../infrastructure/services/role.service';
import { Role } from '../../../../core/models/role.model';

@Component({
  selector: 'app-role-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-admin.component.html',
  styleUrl: './role-admin.component.scss' // <-- ASEGÚRATE DE QUE ESTO ESTÉ AQUÍ
})
export class RoleAdminComponent {
  newRole: Role = { id: 0, nombre: '', permisos: '' };
  isEditing = false;

  constructor(public roleService: RoleService) {}

  edit(r: Role) {
    this.isEditing = true;
    this.newRole = { ...r };
  }

  save() {
    if (this.newRole.nombre.trim()) {
      if (this.isEditing) {
        this.roleService.update({ ...this.newRole });
        this.isEditing = false;
      } else {
        this.newRole.id = Date.now();
        this.roleService.add({ ...this.newRole });
      }
      this.resetForm();
    }
  }

  cancel() {
    this.isEditing = false;
    this.resetForm();
  }

  private resetForm() {
    this.newRole = { id: 0, nombre: '', permisos: '' };
  }
}