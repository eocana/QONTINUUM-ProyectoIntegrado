import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const dni = this.getDniFromToken(token); // Método para obtener el DNI del token
    if (token && dni) {
      this.usuarioService.getUserByDni(dni, token).subscribe(
        data => this.usuario = data,
        error => console.error('Error al obtener el perfil del usuario', error)
      );
    }
  }

    getDniFromToken(token: string | null): string {
    if (!token) {
      console.error('Token no proporcionado');
      return '';
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.dni || '';
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return '';
    }
  }


  goHome(): void {
    this.router.navigate(['/home']);
  }
}
