import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private auth = inject(AuthService);
  user: any = null;

  ngOnInit() {
    // Obtener datos del usuario del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('👤 [Home] Datos del usuario:', this.user);
    }
  }

  logout() {
    this.auth.logout();
    console.log('👋 [Home] Usuario cerró sesión');
  }
}
