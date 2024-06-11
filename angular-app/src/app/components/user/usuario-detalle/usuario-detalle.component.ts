import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class UsuarioDetalleComponent implements OnInit {
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const dni = this.route.snapshot.paramMap.get('dni');
    const token = localStorage.getItem('token');
    if (dni && token) {
      this.usuarioService.getUserByDni(dni, token).subscribe(
        data => this.usuario = data,
        error => console.error('Error al obtener detalles del usuario', error)
      );
    }
  }
}
