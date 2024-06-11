import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/user/usuarios/usuarios.component';
import { UsuarioDetalleComponent } from './components/user/usuario-detalle/usuario-detalle.component';
import { UsuarioCrearComponent } from './components/user/usuario-crear/usuario-crear.component';
import { HomeComponent } from './components/home/home.component';
import { BorrarUsuarioComponent } from './components/user/borrar-usuario/borrar-usuario.component';
import { ActualizarContraseñaComponent } from './components/user/actualizar-password/actualizar-password.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/:dni', component: UsuarioDetalleComponent, canActivate: [AuthGuard] },
  { path: 'crear-usuario', component: UsuarioCrearComponent, canActivate: [AuthGuard] },
  { path: 'borrar-usuario', component: BorrarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-contraseña', component: ActualizarContraseñaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
