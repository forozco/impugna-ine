import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MockDataService } from './mock-data.service';

interface LoginResponse {
  ok: boolean;
  token?: string;
  user?: { username: string; dn: string; groups: string[] };
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private mockService = inject(MockDataService);
  private api = '/api'; // Usando proxy

  get token(): string | null {
    return localStorage.getItem('token');
  }
  set token(v: string | null) {
    if (v) localStorage.setItem('token', v);
    else localStorage.removeItem('token');
  }

  login(username: string, password: string) {
    // Verificar si debemos usar datos mock
    if (this.mockService.shouldUseMockData()) {
      console.log('🎭 [AuthService] Usando modo MOCK para login');
      return this.mockService.mockLogin(username, password);
    }

    console.log('🔐 [AuthService] Enviando solicitud de login LDAP:', {
      username,
      url: `${this.api}/auth/login`,
      timestamp: new Date().toISOString()
    });

    return this.http.post<LoginResponse>(`${this.api}/auth/login`, { username, password });
  }

  // Método para probar la conectividad con el backend
  testConnection() {
    console.log('🌐 [AuthService] Probando conectividad con el backend...');
    return this.http.get(`${this.api}/health`).pipe(
      tap(response => console.log('✅ [AuthService] Backend disponible:', response)),
      tap({
        error: (error) => console.error('❌ [AuthService] Backend no disponible:', error)
      })
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
    console.log('👋 [AuthService] Sesión cerrada, redirigiendo a login');
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return !!this.token; }
}
