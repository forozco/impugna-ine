import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  ok: boolean;
  token?: string;
  user?: {
    username: string;
    dn: string;
    groups: string[];
    authorities?: string[];
    details?: any;
  };
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private http = inject(HttpClient);

  /**
   * Simula una respuesta de login exitosa usando datos mock
   */
  mockLogin(username: string, password: string): Observable<LoginResponse> {
    console.log('[MockDataService] Simulando login con datos mock para:', username);

    // Simular diferentes usuarios para testing
    if (username === 'admin' && password === 'admin') {
      return this.http.get<LoginResponse>(`${environment.mockDataPath}login-response.json`).pipe(
        delay(500) // Simular latencia de red
      );
    } else if (username === 'test' && password === 'test') {
      // Usuario mock alternativo
      const mockResponse: LoginResponse = {
        ok: true,
        token: 'mock-token-test-user',
        user: {
          username: 'test.user',
          dn: 'uid=test.user,ou=People,dc=ife.org.mx',
          groups: ['TEST.GROUP.OC'],
          authorities: ['ROLE_TEST.GROUP.OC'],
          details: {
            nombreCompleto: 'Usuario de Prueba',
            nombreCorto: 'Test User',
            email: 'test@ine.mx',
            idDistrito: '01',
            idEstado: '01',
            nombreUsuario: 'test.user',
            givenName: 'Test'
          }
        }
      };
      return of(mockResponse).pipe(delay(300));
    } else {
      // Login fallido
      const errorResponse: LoginResponse = {
        ok: false,
        error: 'Credenciales incorrectas (modo mock)'
      };
      return of(errorResponse).pipe(delay(200));
    }
  }

  /**
   * Verifica si deberíamos usar datos mock
   */
  shouldUseMockData(): boolean {
    return environment.useMockData === true;
  }
}
