import { Component, OnInit, ViewChild, HostListener, Inject, PLATFORM_ID, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { isPlatformBrowser } from '@angular/common';

import { MensajeNuloMovimientoService } from './mensaje-nulo-movimiento.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnChanges {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public searchtext1 = "jalador";
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public banners = [];
  filteredProducts: string[] = []; // Lista filtrada de productos basada en la entrada del usuario

  @Input() product: Product;

  numeroPagina= 0




  public colors = [
    { name: "#5C6BC0", selected: false },
    { name: "#66BB6A", selected: false },
    { name: "#EF5350", selected: false },
    { name: "#BA68C8", selected: false },
    { name: "#FF4081", selected: false },
    { name: "#9575CD", selected: false },
    { name: "#90CAF9", selected: false },
    { name: "#B2DFDB", selected: false },
    { name: "#DCE775", selected: false },
    { name: "#FFD740", selected: false },
    { name: "#00E676", selected: false },
    { name: "#FBC02D", selected: false },
    { name: "#FF7043", selected: false },
    { name: "#F5F5F5", selected: false },
    { name: "#696969", selected: false }
  ];
  public sizes = [
    { name: "S", selected: false },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
    { name: "2XL", selected: false },
    { name: "32", selected: false },
    { name: "36", selected: false },
    { name: "38", selected: false },
    { name: "46", selected: false },
    { name: "52", selected: false },
    { name: "13.3\"", selected: false },
    { name: "15.4\"", selected: false },
    { name: "17\"", selected: false },
    { name: "21\"", selected: false },
    { name: "23.4\"", selected: false }
  ];
  public page:any = 1;
  public settings: Settings;
  public searchText: string="";
  public banervisible:boolean=false;
  public viewprice:boolean=false;
  mensajeRecibido:any;

  verSoloNulo = false;

  constructor(public appSettings:AppSettings,
              private activatedRoute: ActivatedRoute,
              public appService:AppService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,

              @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
    if (this.route.snapshot.queryParamMap.keys.length > 0) {

      if (this.route.snapshot.queryParamMap.has('textSearch'))
      {

        this.searchText = (this.route.snapshot.queryParamMap.get('textSearch')


        );
        console.log(this.searchText)


      }



    }

  }



  ngOnChanges(changes: SimpleChanges): void {

  }
  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;

    })
  }
  ngOnInit() {


    this.route.params.subscribe(params => {
      const page = +params['page'];
      if (!isNaN(page)) {
        // Actualiza la variable de página en el componente
        this.page = page;
        // Realiza cualquier acción necesaria con la página, como cargar datos
        this.getProductsEmpleado();
      }
    });





  this. getBanners();

    // this.mensaje();


        // this.appService.getperiodosventa().subscribe(res=>{
        //   console.log(res);
        //   console.log(res.DentroPeriodo);
        //   //localStorage.setItem('Esdiadeventa',JSON.stringify( res.DentroPeriodo))

        // });
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    if(userauth!=undefined){
    if(userauth.Nombre!="")
    {
      this.viewprice=true;
    }}
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {

    });


    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };

    this.getCategories();
    this.getBrands();
   //this.getAllProducts(); // hace que muestre todos los productos

    this.getProductsEmpleado(); //muestra solo los productos de venta empleado
    // this.soloNuloMovimiento(); // muestra solo los productos de nulo Movimiento


    // if(this.verSoloNulo){
    //   this.soloNuloMovimiento();
    // }else{
    //   this.getProductsEmpleado();
    // }


  }


  public getAllProducts(){

    // this.appService.getProducts('featured').subscribe(data=>{
    //     this.products = data;

    //     //for show more product
    //     // for (var index = 0; index < 3; index++) {
    //     //   this.products = this.products.concat(this.products);
    //     // }
    //   });
    this.appService.getProductsApi(this.searchText).subscribe(data=>{
      this.products = data;


      //for show more product
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);
      // }
    });
  }

  public getCategories(){
    if(this.appService.Data.categories.length == 0) {
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else{
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
    this.brands.forEach(brand => { brand.selected = false });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    this.getProductsEmpleado();
  }

  public changeSorting(sort){
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
        direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public onPageChanged(event){
    this.page = event;



    // this.router.navigate(['/productos'], { queryParams: { page: event } });

    if(!this.searchText){
    this.router.navigate(['/productos', this.page]);
    }
    // else{
    //   this.onChangeCategory(event);

    // }


    this.getProductsEmpleado();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
  }

  public onChangeCategory(event){
    if(event.target){
      this.router.navigate(['/productos', event.target.innerText.toLowerCase()]);

      this.searchText=event.target.innerText;

      this.getProductsEmpleado();
    }
  }

  //para buscar en la barra y solo salgan los productos de empleados
  public getProductsEmpleado(){

    if(this.searchText.toUpperCase()=='NULO MOVIMIENTO')
    {

      this.banervisible=true;
    }
      this.appService.getProductsApiEmpleado(this.searchText).subscribe(data=>{
      this.products = data;
      // console.log(data)
        // console.log( "producto que se manda desde products" + this.products)

    });
  }

  //cambiar a español los coontroles next

    // itemsPerPageLabel = 'Items por página'; // Opcional: Cambia la etiqueta de "Items per page"
    // nextPageLabel = 'Siguiente'; // Cambia el texto de "Next"
    // previousPageLabel = 'Anterior'; // Cambia el texto de "Previous"



    soloNuloMovimiento(){
      this.appService.getProductsApiNuloMovimiento(this.searchText).subscribe(data=>{
        this.products = data
      })
    }


    // mensaje(){
    //   this.mensajeRecibido = this.mensajeNuloMovimientoService.getMessage();
    // }



    accederAPaginate(){

    }

    }









