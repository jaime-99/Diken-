import { Component, OnInit, HostListener, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Category, Product } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from './openDialog.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit {
  public showBackToTop:boolean = false;
  public categories:Category[];
  public category:Category;
  public sidenavMenuItems:Array<any>;
  public stringsearh="";
  public searchText!: string;
  public searchText1='';
  public searchText2 ='';
  public viewsearchandcart=false;

  public products = [];
  filteredProducts: string[] = []; // Lista filtrada de productos basada en la entrada del usuario
  filteredProducts1: string[] = []; // Lista filtrada de productos basada en la entrada del usuario
  showAutocomplete: boolean = false; // Variable para controlar la visibilidad del autocompletado
  showAutocomplete1: boolean = false; // Variable para controlar la visibilidad del autocompletado


  @ViewChild('sidenav', { static: true }) sidenav:any;

  public settings: Settings;
  mostrarAlerta: boolean;
  constructor(public appSettings:AppSettings,
              public appService:AppService,
              public sidenavMenuService:SidenavMenuService,
              public router:Router,
              public dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);

    this.getProductsEmpleado();

    if(userauth!=undefined)
    {
      if(userauth.UsuarioId!=0)
      {
        this.viewsearchandcart=true;
      }
    }
    this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    setTimeout(() => {
      this.settings.theme = 'green';
    });
    // alert("hi");
  }

  public getCategories(){
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = data[0];
      this.appService.Data.categories = data;
    })
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    }
  }

  public remove(product) {
      const index: number = this.appService.Data.cartList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.cartList.splice(index, 1);
          this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.newPrice*product.cartCount;
          this.appService.Data.totalCartCount = this.appService.Data.totalCartCount - product.cartCount;
          this.appService.resetProductCartCount(product);
      }
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }


  public changeTheme(theme){
    this.settings.theme = theme;
  }

  public stopClickPropagate(event: any){

    event.stopPropagation();
    event.preventDefault();
  }

  // es para buscar un producto con enter en el teclado
  public search(event:any){

    this.searchText = (event.target as HTMLInputElement).value;
    // console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }


    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/productos',this.searchText],{queryParams:queryParams});
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);

    // alerta de no se encontraron productos

    const searchTextLowerCase = this.searchText1.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

    const productFound = this.products.some(product => {
    const nameLowerCase = product.name.toLowerCase(); // Convertir el nombre del producto a minúsculas
    const codigoDikenLowerCase = product.CodigoDiken.toLowerCase(); // Convertir el códigoDiken a minúsculas
    const textSearch = product.TextSearch.toLowerCase();

    return nameLowerCase.includes(searchTextLowerCase) || codigoDikenLowerCase.includes(searchTextLowerCase)
    || textSearch.includes(searchTextLowerCase)
      });

      if (!productFound) {
        this.router.navigate(['/productos'])
        this.abrirDialog();

      }
  }

  // este metodo es para el boton para buscar,
  search1(searchText: string): void {
    this.searchText1 = searchText;
    // console.log(this.searchText1);
    this.appService.search.next(this.searchText1);

    let queryParams: any = {};
    queryParams.textSearch = this.searchText1;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/productos', this.searchText1], { queryParams: queryParams });


    // alerta por si no se encuentran los productos de el search1( click con boton )
    const searchTextLowerCase = this.searchText1.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

    const productFound = this.products.some(product => {
    const nameLowerCase = product.name.toLowerCase(); // Convertir el nombre del producto a minúsculas
    const codigoDikenLowerCase = product.CodigoDiken.toLowerCase(); // Convertir el códigoDiken a minúsculas

    return nameLowerCase.includes(searchTextLowerCase) || codigoDikenLowerCase.includes(searchTextLowerCase);
});

      if (!productFound) {
        this.router.navigate(['/productos'])
        this.abrirDialog();

      }

  }


  // esta funcione es para cuando se hace resposnive la barra de bsuqueda
  search2(searchText: string): void {
    this.searchText2 = searchText;
    console.log(this.searchText2);
    this.appService.search.next(this.searchText2);

    let queryParams: any = {};
    queryParams.textSearch = this.searchText2;
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/productos', this.searchText2], { queryParams: queryParams });


    //todo checar esto , falta solo que diga el nombre del producto en responsive
    const searchTextLowerCase = this.searchText2.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

    const productFound = this.products.some(product => {
    const nameLowerCase = product.name.toLowerCase(); // Convertir el nombre del producto a minúsculas
    const codigoDikenLowerCase = product.CodigoDiken.toLowerCase(); // Convertir el códigoDiken a minúsculas
    const textSearch = (product.TextSearch || '').toLowerCase(); // Convertir TextSearch a minúsculas, o usar una cadena vacía si es nulo

    return nameLowerCase.includes(searchTextLowerCase) || codigoDikenLowerCase.includes(searchTextLowerCase)
    || textSearch.includes(searchTextLowerCase);
});

      if (!productFound) {
        this.router.navigate(['/productos'])
        this.abrirDialog();

      }

    // alert("hola");
  }



  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval);
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0,0);
        }
      });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    let header_toolbar = document.getElementById('header-toolbar');
    if(header_toolbar){
      if(scrollTop >= header_toolbar.clientHeight) {
        this.settings.mainToolbarFixed = true;
      }
      else{
        if(!document.documentElement.classList.contains('cdk-global-scrollblock')){
          this.settings.mainToolbarFixed = false;
        }
      }
    }
    else{
      this.settings.mainToolbarFixed = true;
    }
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }
  }


  public getProductsEmpleado(){

    this.appService.getProductsApiEmpleado(this.searchText1).subscribe(data=>{
    this.products = data;

    // console.log(data)
  });
}


// Función para manejar los cambios en el valor del campo de búsqueda
onSearchInputChange() {
  this.filteredProducts = this.filterProducts(this.searchText1);
  this.showAutocomplete = !!this.searchText1; // Mostrar el autocompletado si el campo de búsqueda tiene texto

  // this.filteredProducts1 = this.filterProducts(this.searchText2);
  // this.showAutocomplete1 = !!this.searchText2; // Mostrar el autocompletado si el campo de búsqueda tiene texto


}

filterProducts(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.products.filter((product) => product.TextSearch.toLowerCase().includes(filterValue));
}

//manejar el valor de busqueda de dispositivos moviles
onSearchInputChange2(){
  this.filteredProducts1 = this.filterProducts(this.searchText2);
  this.showAutocomplete1 = !!this.searchText2; // Mostrar el a
}


abrirDialog(): void {
  const dialogRef = this.dialog.open(openDialog, {
    // Configuración del diálogo (puedes personalizar esto según tus necesidades)
    width: '300px',
    data: { mensaje: this.searchText1 } // Puedes enviar datos al diálogo si es necesario
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
    // Puedes manejar la respuesta del diálogo aquí si es necesario
  });
}

}

