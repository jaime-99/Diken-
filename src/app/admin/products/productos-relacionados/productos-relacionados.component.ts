import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { ProductZoomComponent } from '../product-detail/product-zoom/product-zoom.component';
import { EscogerProductos } from './productos-escoger.component';

import { SharedService } from './esRelacionado.service';


@Component({
  selector: 'app-productos-relacionados',
  templateUrl: './productos-relacionados.component.html',
  styleUrls: ['./productos-relacionados.component.scss']
})
export class ProductosRelacionadosComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: UntypedFormGroup;
  public products: Array<Product> = [];
  public productsSustitutos: Array<Product> = [];
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  public ProductoId:any;


  subCategoria = '';
  // public esRelacionado: boolean = false;

  // @ViewChild('esRelacionado') esRelacionado: EscogerProductos;
  @Output() esRelacionadoChanged = new EventEmitter<boolean>();
  esRelacionado: boolean;



  constructor(public appService:AppService,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
      public formBuilder:
      UntypedFormBuilder,
      public router: Router,
      private sharedService: SharedService
      ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.ProductoId=params['id']
        this.getProductById(params['id']);
        this.getAllProducts(params['id']);
        this.getAllProductsSutitutos(params['id']);
      }
      else{
        this.getProductById(1);
      }
    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });


    // this.enviarValor();
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id){
    this.appService.getProductsByIdApi(id).subscribe(data=>{
      this.product = data;
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => {
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }

  public selectImage(image){
    this.image = image.medium;
    this.zoomImage = image.big;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
    }
  }

  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.getProductById(params['id']);
        this.getAllProducts(params['id']);
        this.getAllProductsSutitutos(params['id']);
      }
      else{
        this.getProductById(1);
      }
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }
  public search2(event:any){

    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.getProductById(params['id']);
        this.getAllProducts(params['id']);
        this.getAllProductsSutitutos(params['id']);
      }
      else{
        this.getProductById(1);
      }
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  public getAllProducts(id:any){
    this.appService.getProductsApiRelacionados(id).subscribe(data=>{
      this.products = data;
      //for show more product
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);
      // }
    });
  }
  public getAllProductsSutitutos(id:any){
    this.appService.getProductsApiSustitutos(id).subscribe(data=>{
      this.productsSustitutos = data;
      //for show more product
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);
      // }
    });
  }

  //emieza jaime,
  // este producto es para que te mande a la pestaña de productos
  public agrega(id){
    if(id===1){

      this.esRelacionado = true;
      this.sharedService.setEsRelacionado(this.esRelacionado);
      // console.log("debe dar true")
      this.router.navigate(['/admin/products/EscogerProductos',this.product.id])
    }else{

      this.esRelacionado = id ===2
      this.esRelacionado = false;
      this.sharedService.setEsRelacionado(this.esRelacionado);
      // console.log("debe dar false")
      this.router.navigate(['/admin/products/EscogerProductos',this.product.id])
    }



  }

  // enviarValor() {
  //   // Aquí estás emitiendo el valor al evento personalizado 'enviarValorA'
  //   this.subCategoria = this.product.SubFamilia

  // }

}
