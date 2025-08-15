import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { AuthService } from './features/auth/services/auth-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vortex-shipments');
  private authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
