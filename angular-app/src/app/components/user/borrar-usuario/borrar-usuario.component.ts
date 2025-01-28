import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BorrarUsuarioComponent {
  dni: string = '';
  message: string = '';
  userDni: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  onDelete(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuarioService.deleteUser(this.dni, this.userDni, token).subscribe(
        response => {
          this.message = 'Usuario borrado exitosamente';
          this.cdr.markForCheck();
        },
        error => {
          this.message = 'Error al borrar usuario';
          this.cdr.markForCheck();
        }
      );
    } else {
      this.message = 'Error al borrar usuario: no se encontró el token.';
      this.cdr.markForCheck();
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
