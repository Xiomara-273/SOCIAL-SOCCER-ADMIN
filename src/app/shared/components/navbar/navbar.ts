import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para [class.open]
import { RouterModule } from '@angular/router'; // Necesario para routerLink

@Component({
  selector: 'app-navbar',
  standalone: true, // Importante para Angular 17+
  imports: [CommonModule, RouterModule], // <--- ESTO ES LO QUE ACTIVA LOS CLICS
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    // Este log te confirmará en la consola del navegador (F12) que el clic funciona
    console.log('Cambiando estado del menú. Abierto:', !this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}