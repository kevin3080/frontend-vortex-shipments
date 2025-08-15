import { Component, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../services/dashboard-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from '../../../../shared/constants/routes';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    MatCard,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss'
})
export class MainDashboard {
  private router = inject(Router);
  private dashboardService = inject(DashboardService);

  public clientsCount$ = this.dashboardService.getClientsCount();
  public landShipmentsCount$ = this.dashboardService.getLandShipmentsCount();
  public maritimeShipmentsCount$ = this.dashboardService.getMaritimeShipmentsCount();

    goToClients(): void {
    this.router.navigate([ROUTES.CLIENTS]);
  }


  goToLandShipments(): void {
    this.router.navigate([ROUTES.LAND_SHIPMENTS]);
  }

  goToSeaShipments(): void {
    this.router.navigate([ROUTES.SEA_SHIPMENTS]);
  }

  newLandShipment(): void {
    this.router.navigate([ROUTES.LAND_SHIPMENTS], { queryParams: { action: 'new' } });
  }

  newSeaShipment(): void {
    this.router.navigate([ROUTES.SEA_SHIPMENTS], { queryParams: { action: 'new' } });
  }

}
