import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  // Variable para controlar si el menú móvil está abierto o cerrado
  isMenuOpen: boolean = false;

  /**
   * Alterna el estado del menú (Abrir/Cerrar)
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Cierra el menú al hacer clic en un link o fuera de él
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}