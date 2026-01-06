export interface Role {
  id: number;
  nombre: string;
  permisos: string; // Ejemplo: "Acceso Total", "Solo Lectura", "Gestión de Canchas"
}