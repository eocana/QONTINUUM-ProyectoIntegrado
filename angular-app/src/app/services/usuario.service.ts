import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(login: string, contrasenya: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { login, contrasenya });
  }

  getUsers(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  getUserByDni(dni: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/${dni}`, { headers });
  }

  createUser(user: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/users`, user, { headers });
  }

  updateUserPassword(dni: string, newPassword: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/password`, { dni, newPassword }, { headers });
  }

  deleteUser(dni: string, userDni: string,token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/users`, { headers, body: { dni } });
  }
}
