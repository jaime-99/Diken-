import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: UntypedFormGroup;
  public relatedProducts: Array<Product>;
  public ProductosSustitutos:Array<Product>;
  public viewprice:boolean=false;

  @Input() searchText

  public numeroPagina: any = 4;

  constructor(public appService:AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: UntypedFormBuilder
    , private router:Router) {  }

  ngOnInit() {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    if(userauth!=undefined){
    if(userauth.Nombre!="")
    {
      this.viewprice=true;
    }}
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductById(params['id']);
      this.getRelatedProducts(params['id']);
      const numeroPagina = (params['page'])
      this.numeroPagina = numeroPagina

    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });


    console.log( "datos del componete padre al hijo " ,this.searchText)



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
      // console.log(data)
      this.product.CantidadFraccion=data.CantidadFraccionar;
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => {
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }

  public getRelatedProducts(Id:any){
    this.appService.getProductsApiRelacionados(Id).subscribe(data => {
      this.relatedProducts = data;
    });
    this.appService.getProductsApiSustitutos(Id).subscribe(data => {
      this.ProductosSustitutos = data;
    })

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

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

  goBackToList() {
    // this.router.navigate(['/productos']);
    // this.router.navigate(['/productos'], { queryParams: { page: this.numeroPagina } });

    window.history.back();

    this.router.navigate(['/productos',this.numeroPagina]);



  }
}
