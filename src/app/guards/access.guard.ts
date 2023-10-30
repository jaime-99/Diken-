import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from './acceso.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor( private accesoService:AccesoService, private router:Router  ){}
  canActivate(): boolean {
    if (this.accesoService.haAccedidoPorBoton()) {
      // El usuario ha accedido a través de un botón, permitir el acceso.
      return true;
    } else {
      // El usuario no ha accedido a través de un botón, redirigir a la página de inicio.
      this.router.navigate(['/productos']); // Cambia '/inicio' por la ruta que desees.
      return false;
    }
  }

}
