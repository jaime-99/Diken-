import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Data, AppService } from '../../app.service';
import { Product } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {

  @Input('products') products: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  public settings: Settings;
  public viewprice:boolean=false;
  constructor(public appSettings:AppSettings, public appService:AppService, public dialog: MatDialog, private router: Router) {
    this.settings = this.appSettings.settings;
  }


  @Input () page;
  ngOnInit() {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);

if(userauth!=undefined)
    if(userauth.Nombre!="")
    {
      this.viewprice=true;
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

  public openProductDialog(product){
    const page = this.page
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
        direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/productos', product.id, product.name,page]);
      }
    });
  }

}
