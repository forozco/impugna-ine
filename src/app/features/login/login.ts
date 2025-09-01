import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  errorMsg = '';
  loading = signal(false);

  async login() {
    console.log('🚀 [Login] Método login() ejecutado - Formulario login.html');
    console.log('📝 [Login] Username:', this.username);
    console.log('📝 [Login] Password length:', this.password?.length);

    if (!this.username || !this.password) {
      this.errorMsg = 'Por favor, ingresa usuario y contraseña';
      console.log('❌ [Login] Campos vacíos');
      return;
    }

    this.loading.set(true);
    this.errorMsg = '';
    console.log('🔄 [Login] Iniciando proceso de login...');

    try {
      console.log('⏳ [Login] Enviando credenciales al servidor LDAP...');
      const resp = await this.auth.login(this.username, this.password).toPromise();

      console.log('📨 [Login] Respuesta completa del servidor LDAP:', {
        response: resp,
        ok: resp?.ok,
        token: resp?.token ? '***TOKEN_PRESENTE***' : 'NO_TOKEN',
        user: resp?.user,
        error: resp?.error,
        timestamp: new Date().toISOString()
      });

      if (resp?.ok && resp.token) {
        console.log('✅ [Login] Login exitoso, guardando token y redirigiendo');
        console.log('👤 [Login] Información del usuario LDAP:', resp.user);
        this.auth.token = resp.token;

        // Guardar datos del usuario si existen
        if (resp.user) {
          localStorage.setItem('user', JSON.stringify(resp.user));
        }

        console.log('🏠 [Login] Redirigiendo a /home');
        this.router.navigate(['/home']);
      } else {
        console.log('❌ [Login] Login fallido:', resp?.error || 'Error de autenticación');
        this.errorMsg = resp?.error || 'Credenciales incorrectas';
      }
    } catch (e: any) {
      console.error('💥 [Login] Error en la comunicación con el servidor LDAP:', {
        error: e,
        errorMessage: e?.message,
        errorStatus: e?.status,
        errorStatusText: e?.statusText,
        errorDetails: e?.error,
        timestamp: new Date().toISOString()
      });

      if (e?.status === 401) {
        console.error('🔐 [Login] Error 401: Credenciales incorrectas o usuario no autorizado');
        this.errorMsg = 'Usuario o contraseña incorrectos. Verifica tus credenciales LDAP.';
      } else if (e?.status === 0) {
        console.error('🌐 [Login] Error de conexión: Backend no disponible');
        this.errorMsg = 'No se puede conectar al servidor. Verifica que el backend esté corriendo en localhost:4000';
      } else if (e?.status >= 500) {
        console.error('🔥 [Login] Error del servidor LDAP');
        this.errorMsg = 'Error interno del servidor LDAP. Contacta al administrador.';
      } else {
        this.errorMsg = e?.error?.error || e?.message || 'Error al conectar con el servidor';
      }
    } finally {
      this.loading.set(false);
      console.log('🏁 [Login] Proceso de autenticación terminado');
    }
  }
}
