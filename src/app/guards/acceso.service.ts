import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor() { }


  private accesoPorBoton = false;

  setAccesoPorBoton() {
    this.accesoPorBoton = true;
  }

  haAccedidoPorBoton(): boolean {
    return this.accesoPorBoton;
  }

  resetAcceso() {
    this.accesoPorBoton = false;
  }
}
