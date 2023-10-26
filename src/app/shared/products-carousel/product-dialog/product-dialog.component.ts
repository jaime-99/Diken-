import { Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from '../../../app.models';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDialogComponent implements OnInit {
  public config: SwiperConfigInterface = {};
  public viewprice:boolean=false;
  constructor(public appService:AppService,
              public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    if(userauth!=undefined){
    if(userauth.Nombre!="")
    {
      this.viewprice=true;
    }}

   }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      }
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
