import { array } from '@amcharts/amcharts5';
import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { id } from '@swimlane/ngx-charts';
import { detalles } from './detalles.component';




@Component({
  selector: 'app-misPedidos',
  templateUrl: './misPedidos.component.html',
  styleUrls: ['./misPedidos.scss'],
  encapsulation: ViewEncapsulation.None

})

export class misPedidos  implements OnInit{

  NumeroEmpleado ="";
  Nombre ="";
  grandTotal:number;
  Producto ="";
  Fecha:Date;
  public Ventas:any= [];
  public ventasColaboradores =[]
  Estatus:boolean;
  numPedido:number=0; // para ver que cuales son mis ped

  numerodeUsuario = 0;
  ventasCanceladas = [];
  ventaId=0;
  numeroDeVenta =0;
  mostrarDetallesComponent: boolean = false;
  idDetalles:number=0;

  tieneCuenta:boolean = false;

  @ViewChild('detallesComponent') detallesComponent: detalles;
  documento: any;





  constructor(public appService: AppService, private dialog: MatDialog,
    ) { }

  ngOnInit()  {


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.Nombre = userauth.Nombre;
    this.NumeroEmpleado = userauth.data.Numero_Empleado;



    this.numerodeUsuario = userauth.UsuarioId;
    // console.log(userauth);


    // es para ver solo los del el RhUsuarioId
    this.appService.GetVentasEmpleadoPorId(userauth.UsuarioId).subscribe((res)=>{
      this.Ventas = res;
      //this.Ventas=res;
      // console.log( "estas son las ventas normales "+ this.Ventas);
      // console.log(userauth.UsuarioId)

    });


    this.appService.GetVentaColaboradoresPorId(userauth.UsuarioId).subscribe((res)=>{
      this.ventasColaboradores = res;
    })




    //   // de las venta debo agarrar el idStatus y colocarlo en status
    //   //console.log(userauth.UsuarioId)
    //   //this.numeroDeVenta = Ventas.ventaEmpleadoId;

    //   for (let venta of this.Ventas) {
    //     let idEstatusVentaEmpleado = venta.idEstatusVentaEmpleado;
    //     //console.log('Valor de idEstatusVentaEmpleado:', venta.IdEstatusVentaEmpleado);

    //     // Verificar el valor de idEstatusVentaEmpleado y mostrar el botón en caso de ser 1
    //     if (idEstatusVentaEmpleado === 1) {
    //       // this.mostrarBotonCancelar = true; c
    //       //console.log("es uno ");
    //     } else {
    //       // this.mostrarBotonCancelar = false;
    //       //console.log("no es uno");
    //     }
    //   }

    // });


  //   this.appService.Data.cartList.forEach(product => {
  //     this.grandTotal += product.cartCount * product.newPrice;

  // }
  //console.log(this.mostrarDetallesComponent);
  }



    BtnCancelar(id): void {

      this.appService.CancelarVenta(id).subscribe((res) => {

        location.reload();  // hace que la pagina se recargue automaticamente
        //this.actualizarDatosLocalmente(id);

      })
    }

    actualizarDatosLocalmente(id: number): void {
      // Realizar la lógica para actualizar los datos localmente en tu aplicación
      // Por ejemplo, si tienes un arreglo de ventas en tu componente, puedes eliminar la venta correspondiente del arreglo
      const index = this.Ventas.findIndex(venta => venta.id === id);
      if (index !== -1) {
        this.Ventas.splice(index, 1); // Eliminar la venta del arreglo
      }
    }

    mostrarMensajeAlerta(id):void{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: {
          title: "Cancelar Pedido",
          message: "Estas seguro que quieres cancelar el pedido?"
        }

      });
      // cuando se cierra el dialogo
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.appService.CancelarVenta(id).subscribe((res) => {
            // Lógica después de cancelar la venta
            //console.log(res); // Imprime la respuesta en la c
            location.reload();
            //this.actualizarDatosLocalmente(id);

          })
      }});
    }

    //Aqui ira el ejemplo, para mostrar el id

    ejemplo(id,documento):void{

      this.mostrarDetallesComponent = true;
      this.idDetalles = id

      this.documento = documento

      //console.log(this.idDetalles);

    }



    regresarDesdeDetalles() { // esto se activa cuando le doy click en regresar desde la clase de detalles
      this.mostrarDetallesComponent = false;
      this.idDetalles = 0; // Restablecer idDetalles al valor predeterminado

      // this.detallesComponent.ocultarDetalles();
    }

    }



