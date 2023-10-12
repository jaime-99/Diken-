import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { misPedidos } from './misPedidos.component';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']


})

export class detalles implements OnInit {
  constructor(  public appService:AppService,private router:Router ) { }

  ngOnInit() {
    this.obtenerDetalles();

  }
  detalles =[]

  @Input() idVenta: number = 0;

  @Output() regresar: EventEmitter<void> = new EventEmitter<void>();


  regresarAVentas(){
    this.idVenta = 0; // Restablecer el valor de idVenta para ocultar los detalles
    this.regresar.emit(); // todo esto hace que se regrese a pedidos
  }

  ocultarDetalles(){
    this.idVenta =0
  }


  obtenerDetalles(){
    const detalleId = {
      detalleId:this.idVenta
    }

    this.appService.getDetallesPorVentaEmpleado(detalleId.detalleId).subscribe((res)=>{
      console.log(res);

      this.detalles = res;




    })


  }





}


