import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { Settings,AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-cproductlist',
  templateUrl: './cproductlist.component.html',
  styleUrls: ['./cproductlist.component.scss']
})
export class CproductlistComponent implements OnInit {
  @Input('products') products: Array<Product> = [];
  @Input('ProductoPadreId') ProductoPadreId:any;
  @Input('EsRelacionado') EsRelacionado:any;
  @Input('ProductoRelacionadoId') ProductoRelacionadoId:any;

  public config: SwiperConfigInterface = {};
  public settings: Settings;



  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  id:number;
  p_ProductoId :number;
  idSustituto: number;
  idRelacionado:number;
  // snackBar: any;
  constructor(public appSettings:AppSettings,public appService:AppService, public snackBar:MatSnackBar, ) {this.settings = this.appSettings.settings; }

  ngOnInit(): void {
    // console.log(this.EsRelacionado);
    // this.verRelacionados();
  }
  agrega()
  {
    alert(this.EsRelacionado);
  }
  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    // console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;


    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  public onPageChanged(event){
    this.page = event;
    window.scrollTo(0,0);
  }

  verSustitutos(id){
    // es para ver los productos sustitutos

    //!validar si es o no relacionado en esta misma funcion para que cuando sea relacionado llame a la otra de eliminar
    //! y cuando sea sustituto llame a la otra

    this.appService.verSustitutos(id).subscribe((res)=>{
    // console.log(res);

    const productoInfo = res.productoInfo; // debo obtener el valor de sustitutoId

    if (res.productoInfo && res.productoInfo.length > 0) {
      for (const producto of res.productoInfo) {
        const productoSustitutoId = producto.ProductoSustitutoId;
        // console.log('ProductoSustitutoId:', productoSustitutoId);
        this.idSustituto= productoSustitutoId
      }

        //  console.log(this.idSustituto)

         if(this.EsRelacionado===1){
          this.verRelacionados(id)
          // this.remove()
          }else{
            this.remove();
          }

    }
    });



  }
  verRelacionados(id){
    // es para ver los productos relacionados
    this.appService.verRelacionados(id).subscribe((res)=>{
      // console.log(res);

      if (res.productoInfo && res.productoInfo.length > 0) {
        for (const producto of res.productoInfo) {
          const productoRelacionadoId = producto.ProductoRelacionadoId;
          // console.log('ProductoRelacionadoId:', productoRelacionadoId);
          this.idRelacionado= productoRelacionadoId
          // console.log(id);
          this.remove()
        }
      }



    });

  }

  remove(){
    //eliminar relacionado
    // this.id = id

    if(this.EsRelacionado===0){
      const id = this.idSustituto
    this.appService.eliminarSustitutos(id).subscribe((res)=>{
      // console.log(res);
      // console.log(this.idSustituto);
      // this.snackBar.open('se elimino el producto sustituto '  ,  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });


    })
  }

  else if(this.EsRelacionado===1){
      const id = this.idRelacionado
    // console.log(' es relacionado')
    this.appService.eliminarRelacionado(id).subscribe((res)=>{
      // console.log(res)
      // console.log(this.idRelacionado)
      this.snackBar.open('se elimino el producto relacionado '  ,  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    })

  }
}


ngAfterViewInit(){
  this.config = {
    observer: true,
    slidesPerView: 1,
    spaceBetween: 16,
    keyboard: true,
    navigation: true,
    pagination: false,
    grabCursor: true,
    loop: false,
    preloadImages: false,
    lazy: true,
    breakpoints: {
      480: {
        slidesPerView: 1
      },
      740: {
        slidesPerView: 2
      },
      960: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 4
      },
      1500: {
        slidesPerView: 5
      }
    }
  }
}



}
