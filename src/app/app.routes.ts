import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/public-guard';
import { authGuard } from './core/guards/auth-guard';
import { ROUTES } from './shared/constants/routes';


export const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/components/login/login').then(m => m.Login)
  },
  { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full' },
  {
    path: ROUTES.DASHBOARD,
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/components/main-dashboard/main-dashboard').then(m => m.MainDashboard)
  },
  {
    path: ROUTES.CLIENTS,
    canActivate: [authGuard],
    loadComponent: () => import('./features/clients/components/client-list/client-list').then(m => m.ClientList)
  },
  {
    path: ROUTES.LAND_SHIPMENTS,
    canActivate: [authGuard],
    loadComponent: () => import('./features/land-shipments/components/land-shipment/land-shipment').then(m => m.LandShipment)
  },
  {
    path: ROUTES.SEA_SHIPMENTS,
    canActivate: [authGuard],
    loadComponent: () => import('./features/land-shipments/components/land-shipment/land-shipment').then(m => m.LandShipment)
  }
];