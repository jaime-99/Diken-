import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TablaConsolidadoComponent } from '../../tablaDetalles/tabla-consolidado/tabla-consolidado.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, filter } from 'rxjs';
import * as Papa from 'papaparse';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';




@Component({
  selector: 'app-pedidos-consolidados',
  templateUrl: './pedidos-consolidados.component.html',
  styleUrls: ['./pedidos-consolidados.component.scss']
})


export class PedidosConsolidadosComponent implements OnInit {
  selectedConsolidadoId: number | null = null; // Variable para almacenar el IdConsolidadoVentaEmpleado seleccionado

  consolidados=[];
  consolidadoDetalles=1;
  numAdmin:number =0;
  dataSource: MatTableDataSource<any>;
  detalleVentasArray=[];
  IdSeleccionado=0;
  UsuarioId: any;
  total: any;
  ventasEmpleado: any[];
  consolidadosPendiente: any[];
  consolidadosCerrado: any[];
  consolidadosProceso: any[];
  consolidadosFiltrados: any[];
  DetalleConsolidadoOV:any[];
  filtroTexto: any;
  mostrarBusqueda: boolean = false;
  aviso: boolean;
  constructor(public dialog: MatDialog, public appService: AppService, public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar) { }

  consolidadoIds: number[] = []; // Arreglo para almacenar los IdConsolidadoVentaEmpleado
    searchText='';

  private subscription: Subscription | undefined; // Almacena la suscripción

  precio: number;
  codigoDiken: string;
  openTable = false;

  numPedido: UntypedFormGroup;
  partidas=[];
  eliminado: boolean;



  ngOnInit(): void {

    this.numPedido = this.formBuilder.group({
      Pedido: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/), Validators.maxLength(4)]]

    });


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    //console.log(userauth);




    // obtengo el id de solo los admin de ventaEmpelados
    this.appService.obtenerAdmin().subscribe((res)=>{

      ////console.log(res)
    })

    // con esto obtengo los consolidados
      this.appService.obtenerConsolidados().subscribe((res)=>{

        this.consolidados = res.filter((consolidado) =>consolidado);
        // obtener los id's
        this.consolidadoIds = this.consolidados.map((consolidado) => consolidado.IdConsolidadoVentaEmpleado);

        this.consolidadosPendiente = res.filter((consolidado) => consolidado.NombreEstatus === 'PENDIENTE');
        // console.log(this.consolidadosPendiente)

        this.consolidadosProceso = res.filter((consolidado) => consolidado.NombreEstatus === 'EN PROCESO');

        this.consolidadosCerrado = res.filter((consolidado) => consolidado.NombreEstatus === 'FACTURADO');
        // console.log(this.consolidadosPendiente)



        // console.log(res); // para ver los consolidados
    })

  }

  CargarConsolidados()
  {
    this.appService.obtenerConsolidados().subscribe((res)=>{

      this.consolidados = res.filter((consolidado) =>consolidado);
      // obtener los id's
      this.consolidadoIds = this.consolidados.map((consolidado) => consolidado.IdConsolidadoVentaEmpleado);

      this.consolidadosPendiente = res.filter((consolidado) => consolidado.NombreEstatus === 'PENDIENTE');
      // console.log(this.consolidadosPendiente)

      this.consolidadosProceso = res.filter((consolidado) => consolidado.NombreEstatus === 'EN PROCESO');

      this.consolidadosCerrado = res.filter((consolidado) => consolidado.NombreEstatus === 'FACTURADO');
      // console.log(this.consolidadosPendiente)



      // console.log(res); // para ver los consolidados
  })
  }

  seleccionarConsolidado(consolidado: number) {
    this.selectedConsolidadoId = consolidado;
  }



 // obtener los detalles de consolidados


  openDialog() {
    const data = [
      "ola soy jaime"
      // Agregar más datos aquí...
    ];

    this.dialog.open(TablaConsolidadoComponent, {
      data: data
    });
  }

  openDialog1() {
    // el uno es el parametro que se pasara, hay que cambiarlo para obtener el id de consolidado al darle click a detalles
    this.appService.obtenerTablaJunta(1).subscribe((res) => {
      const data = res;
      const precio = data[2].Precio;
      const codigoDiken = data[2].CodigoDiken;
      const importe = data[2].Importe;
      const producto = data[2].Producto;
      const usu = data[2].Usuario;
      const cantidad = data[2].Cantidad;
      const empleado = data[2].Numero_Empleado;

      const detalleVenta = {
        precio: precio,
        codigoDiken: codigoDiken,
        importe:importe,
        producto:producto,
        usuario:usu,
        cantidad:cantidad,
        empleado:empleado
      };


      this.dialog.open(TablaConsolidadoComponent, {
        maxWidth: "90%",
        maxHeight: "90%",
        data: detalleVenta

      });
    });
  }




  abrirTabla(id,ov):void{
    // se abrira la tabla al seleccionar detalles

    if (this.IdSeleccionado === id) {
      this.openTable = !this.openTable;
    } else {
      this.IdSeleccionado = id;

      this.detalleVentasArray = [];
      this.openTable = true;

      if (this.openTable) {
        this.subscription = this.appService
          .obtenerTablaJunta(id)
          .subscribe((res) => {
            const data = res;
            for (const detalle of data) {
              const detalleVenta = {
                precio: detalle.Precio,
                codigoDiken: detalle.CodigoDiken,
                importe: detalle.Importe,
                producto: detalle.Producto,
                usuario: detalle.Usuario,
                cantidad: detalle.Cantidad,
                empleado: detalle.Numero_Empleado,
                ventaEmpleadoId:detalle.VentaEmpleadoId,
                rhUsuarioId:detalle.RhUsuarioId,
                correo:detalle.Correo, // agregar correo

                //detalles

                ventaDetalle:detalle.ventaEmpleadoDetalleId,
                productoId:detalle.ProductoId

              };

              //console.log(res);
              this.detalleVentasArray.push(detalleVenta);
              //console.log(detalleVenta);// ver los detalles de cada fila
            }
            this.appService.getFacturaByOV(ov).subscribe((detFactura)=>{

               const data2=detFactura;
               if(data2.length>0)
            {
              let Factura="";
              for (const det of data)
              {


                if(data2.filter(x=>x.memo==det.producto+" "+det.Numero_Empleado+" "+det.Usuario)[0])
                {
                  let xd=data2.filter(x=>x.memo==det.producto+" "+det.Numero_Empleado+" "+det.Usuario)[0];
                  if(xd.quantity!=det.Cantidad)
                  {
                    Factura=xd.tranid;
                      det.Cantidad=xd.quantity;
                      console.log(det.Cantidad);
                      det.Importe=det.Precio*det.Cantidad;
                      this.appService.UPVentaEmpleadoDetalle(det.ventaEmpleadoDetalleId,det.VentaEmpleadoId,det.Cantidad,xd.tranid).subscribe(
                        (res)=>{
                          console.log(res);
                        }
                      )
                  }
                  else
                  {
                    Factura=xd.tranid;
                  }

                }
                else{
                  this.appService.deletePartida(det.ventaEmpleadoDetalleId,det.VentaEmpleadoId,id).subscribe((res)=>{
                    console.log(res);
                  })
                }

              }
              this.appService.UpdateConsolidado(id,Factura,3).subscribe((res)=>{



              })


              // })

              this.appService.enviarFacturas(id,Factura).subscribe();
              this.snackBar.open('La orden de venta: '+ov+" se cotejo con la Factura:"+Factura,  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            }
            else{
              this.snackBar.open('La orden de Venta no se encutra facturada ' ,  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            }

            })


          });





      }
    }
  }
  //   }else{
  //       if (this.subscription){
  //         this.subscription.unsubscribe();
  //   }


  // }
  // }

  // es para ocultar los detalles
  cerrarTabla(): void {
    this.openTable = false;
    this.IdSeleccionado = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.CargarConsolidados();
    }
  }






  descargarcsv(IdConsolidadoVentaEmpleado)
  {
    this.appService.getdataconsolidadobyid(IdConsolidadoVentaEmpleado).subscribe((res) => {

      this.appService.GenerarOrdenDeventa(res).subscribe((result)=>{
        this.snackBar.open('Se creo la orden de venta: '+result.tranid,  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

        this.appService.obtenerConsolidados().subscribe((res)=>{

          this.consolidados = res.filter((consolidado) =>consolidado);
          // obtener los id's
          this.consolidadoIds = this.consolidados.map((consolidado) => consolidado.IdConsolidadoVentaEmpleado);

          this.consolidadosPendiente = res.filter((consolidado) => consolidado.NombreEstatus === 'PENDIENTE');
          // console.log(this.consolidadosPendiente)

          this.consolidadosProceso = res.filter((consolidado) => consolidado.NombreEstatus === 'EN PROCESO');

          this.consolidadosCerrado = res.filter((consolidado) => consolidado.NombreEstatus === 'FACTURADO');
          // console.log(this.consolidadosPendiente)



          // console.log(res); // para ver los consolidados
      })


      });



    });

  }

  private downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

//obtener fecha
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.formatNumber(currentDate.getMonth() + 1);
    const day = this.formatNumber(currentDate.getDate());
    return `${year}-${month}-${day}`;
  }
  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }


  //mandar el correo a cada usuario de su venta




aplicarFiltro() {
  // Aplicar el filtro al arreglo de datos
  this.consolidadosFiltrados = this.consolidados.filter((consolidado) =>
    consolidado.Empresa.toLowerCase().includes(this.filtroTexto.toLowerCase())||
    consolidado.IdConsolidadoVentaEmpleado.toString().includes(this.filtroTexto)

  );

  if(this.consolidadosFiltrados.length ===0){
    // console.log("no se encontraron consolidados")
    this.aviso = true;
  }else{
    this.aviso = false
  }
  // this.mostrarBusqueda = true;


  // console.log(this.consolidadosFiltrados)
}


onTabChange(event: any) {
  if (event.index === 3) {
    // La primera pestaña está activa
    this.mostrarBusqueda = true;
  } else {
    // Otra pestaña está activa
    this.mostrarBusqueda = false;
  }
}


}

