import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-contraseña',
  templateUrl: './actualizar-password.component.html',
  styleUrls: ['./actualizar-password.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ActualizarContraseñaComponent {
  dni: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  onUpdatePassword(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuarioService.updateUserPassword(this.dni, this.newPassword, token).subscribe(
        response => {
          this.message = 'Contraseña actualizada exitosamente';
          this.cdr.markForCheck();
        },
        error => {
          this.message = 'Error al actualizar contraseña';
          this.cdr.markForCheck();
        }
      );
    } else {
      this.message = 'Error al actualizar contraseña: no se encontró el token.';
      this.cdr.markForCheck();
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
