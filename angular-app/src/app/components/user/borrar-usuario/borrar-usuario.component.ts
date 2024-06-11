import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BorrarUsuarioComponent {
  dni: string = '';
  userDni: string = '';

  constructor(private usuarioService: UsuarioService) { }

  onDelete(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuarioService.deleteUser(this.dni, this.userDni,token).subscribe(
        response => {
          console.log('Usuario borrado exitosamente');
        },
        error => {
          console.error('Error al borrar usuario', error);
        }
      );
    }
  }
}
