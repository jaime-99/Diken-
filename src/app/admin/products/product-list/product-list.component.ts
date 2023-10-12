import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/app.models';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Array<Product> = [];
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  categoria: any;
  nombreCategoria: string;
  seVeNombre: boolean = false;
  constructor(public appService:AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts();
  }



  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    ////console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;


    if(this.categoria ==1){
    this.getAllProducts();
    }else if(this.categoria==2){
      this.verProductosVentaEmpleado();
    }
    else if(this.categoria ==3){
      this.verProductosNuloMovimiento();
    }
    else if(this.categoria ===undefined){
      this.getAllProducts();
    }

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  public getAllProducts(){
    this.appService.getProductsApi(this.searchText).subscribe(data=>{
      this.products = data;
      //for show more product
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);
      // }
    });
  }

  public onPageChanged(event){
    this.page = event;
    window.scrollTo(0,0);
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }


  public remove(product:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Seguro que deseas eliminar este producto?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        const index: number = this.products.indexOf(product);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
      }
    });
  }


  verProductosVentaEmpleado(){
    this.appService.getProductsApiEmpleado(this.searchText).subscribe(data=>{
      // console.log(data)

      this.products= data;
    })
  }

  verProductosNuloMovimiento(){
    this.appService.getProductsApiNuloMovimiento(this.searchText).subscribe(data=>{
      // console.log(data)
      this.products = data;
      this.categoria = 3
    })
  }

//todo nuevo
  escogerCategoria(){
    //aqui escogera la categoria para mostrar solo esos productos

  }

  menuItemClick(event,menu){

    // console.log(menu)


    if(menu==1){
      this.getAllProducts();
      this.categoria =1;
      // console.log(this.categoria)
      this.nombreCategoria='Todos los productos'
      this.seVeNombre = true


    }
    else if(menu ==2){
      this.verProductosVentaEmpleado();
      this.categoria =2
      // console.log(this.categoria)
      this.nombreCategoria='Venta Empleado '
      this.seVeNombre = true


    }
    else if(menu ==3){
      this.verProductosNuloMovimiento();
      this.categoria =3
      this.nombreCategoria='Nulo  Movimiento'
      this.seVeNombre = true
      // console.log(this.categoria)

    }

  }

}
