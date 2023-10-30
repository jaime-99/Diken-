import { Component, OnInit, Input} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaService } from 'src/app/admin-mesadeayuda/ma.service';
import { AppService } from 'src/app/app.service';
import { AccesoService } from 'src/app/guards/acceso.service';

import { MensajeNuloMovimientoService } from 'src/app/pages/products/mensaje-nulo-movimiento.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  numerodeUsuario: any;
  mostrarApartado = false;
  mostrarAdministrador = false;
  mostrarMovimientosNulo = false;
  NumeroEmpleado: any;
  categoriasProducto: any[];

  menu: any[];
  selectedCategoria: string[] ; // Variable para almacenar la categoría seleccionada

  mensaje = "ola"



  constructor(public appService:MaService,public router:Router,
   public appService1: AppService,
   private mensajeNuloMovimientoService:MensajeNuloMovimientoService, private AccesoAdmin:AccesoService) { }

  ngOnInit()  {
    this.mostrarAdmin();


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.NumeroEmpleado = userauth.data.INUsuarioId;
    //console.log(this.NumeroEmpleado)

    this.obtenerCategorias();
    this.obtenerSubMenuEquipos();

  }
  GotoBigData()
  {
    window.open('https://www.dikeninternational.com/bigdata/', '_blank');
  }
  GotoMesadeAyuda()
{
  window.open('https://dikeninternational.com/mesadeayuda', '_blank');
}
GotoRHNET()
{
  window.open('https://rhnet.dikeninternational.com/rh_login.php', '_blank');
}
GotoUniversidadDiken()
{
  window.open('https://www.unidiken.dikeninternational.com', '_blank');
}
  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  GotoAdministracion(){

    this.AccesoAdmin.setAccesoPorBoton();

    this.router.navigate(['/admin/products/product-list']);
  }

  public search(event:any){


    let searchText = event;
    //console.log(searchText);


    let queryParams: any = {};
    queryParams.textSearch=searchText;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }


    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/productos',searchText],{queryParams:queryParams});

  }


  //todo esto es para que solo se muestre la opcion para los administradores de venta

  mostrarAdmin() {
    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    //console.log(userauth);

    this.appService1.obtenerPerfil(4).subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarApartado = true;
        //console.log("Mostrar el apartado para el usuario actual");
      } else {
        this.mostrarApartado = false;
        //console.log("No mostrar el apartado para el usuario actual");
      }
    });
    this.appService1.obtenerPerfil(2).subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarAdministrador = true;

      } else {
        this.mostrarAdministrador = false;

      }
    });
    this.appService1.obtenerPerfil(5).subscribe((res) => {
      if (res !== null && res.includes(userauth.data.INUsuarioId)) {
        this.mostrarMovimientosNulo =true

      } else {
        this.mostrarMovimientosNulo = false;

      }
    });
  }

  mostrarConfigurarion(){

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
  }

  equiposMenuVisible = false;

  toggleEquiposMenu(): void {
    this.equiposMenuVisible = !this.equiposMenuVisible; // Cambiar de true a false y viceversa
  }


  obtenerCategorias(){
    //se obtendran las categorias dinamicamente

      this.appService1.obtenerCategoriasProducto().subscribe((res) =>{
      this.categoriasProducto = res;
    })
  }



  obtenerSubMenuEquipos(){
    this.appService1.obtenerSubMenuEquipos().subscribe((res)=>{
      this.menu = res;
      // console.log(this.menu)
    })
  }


  // openSubMenu(categoria: any) {
  //   this.selectedCategoria = categoria;
  // }


  //colocar el nuloMovimeinto
  sendMessage() {
    const mensaje = 'hola'
    this.mensajeNuloMovimientoService.setMessage();
  }

}
