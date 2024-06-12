import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsuarioCrearComponent {
  nombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  dni: string = '';
  login: string = '';
  contrasenya: string = '';
  fotografia: string = '';
  idDepartamento: number = 0;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onCreate(): void {
    const token = localStorage.getItem('token');
    const user = {
      nombre: this.nombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      dni: this.dni,
      login: this.login,
      contrasenya: this.contrasenya,
      fotografia: this.fotografia,
      idDepartamento: this.idDepartamento
    };

    if (token) {
      this.usuarioService.createUser(user, token).subscribe(
        response => {
          console.log('Usuario creado exitosamente');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error (Component) al crear usuario', error);
        }
      );
    }
  }
}
