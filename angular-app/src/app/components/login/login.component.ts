import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  login: string = '';
  contrasenya: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onLogin(): void {
    this.usuarioService.login(this.login, this.contrasenya).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']); // Redirigir a HomeComponent
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}
