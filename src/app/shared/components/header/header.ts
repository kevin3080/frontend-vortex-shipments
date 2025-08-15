import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ROUTES } from '../../constants/routes';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly routes = ROUTES;

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([this.routes.LOGIN]);
  }

}
