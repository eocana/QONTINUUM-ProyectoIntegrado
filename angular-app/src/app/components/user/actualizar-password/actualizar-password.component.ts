import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-password',
  templateUrl: './actualizar-password.component.html',
  styleUrls: ['./actualizar-password.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ActualizarContraseñaComponent {
  dni: string = '';
  newPassword: string = '';

  constructor(private usuarioService: UsuarioService) { }

  onUpdatePassword(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuarioService.updateUserPassword(this.dni, this.newPassword, token).subscribe(
        response => {
          console.log('Contraseña actualizada exitosamente');
        },
        error => {
          console.error('Error al actualizar password', error);
        }
      );
    }
  }
}
