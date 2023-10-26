import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { math } from '@amcharts/amcharts5';
import { round } from '@amcharts/amcharts5/.internal/core/util/Time';



@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();

  public count:number = 1;
  public align = 'center center';
  avisoDeAgregado: boolean;
  compraSeleccionada: any;
  mostrarDetalles: boolean;
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }
  public Day: boolean=false;

  // @Output() compraAgregada = new EventEmitter<Product>();



  ngOnInit() {
    //let userauth=JSON.parse(localStorage.getItem('Esdiadeventa')!);

    //this.Day=userauth;
    if(this.product){
      if(this.product.cartCount > 0){
        this.count = this.product.cartCount;
      }
    }
    this.layoutAlign();

    // Esto es para que el boton solo se vea lunes, miercoles y viernes
    // const Today = new Date().getDay();
    // this.Day = Today === 1 || Today === 2 || Today === 3 || Today ===4 || Today ===5;

     //console.log(Today);

    //  this.incrementarConFraccion();

  }

  public layoutAlign(){
    if(this.type == 'all'){
      this.align = 'space-between center';
    }
    else if(this.type == 'wish'){
      this.align = 'start center';
    }
    else{
      this.align = 'center center';
    }
  }



  public increment(count){
    if(this.count < this.product.availibilityCount){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }

  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
  }

  //TODO Aqui debo agregar que si tiene fraccionar, agregar ese dinero a la fraccion

  // traer si es fraccion a ese y ya ver si se puede o no

  public incrementarConFraccion(count){
    const cantidadParaSumar = this.product.CantidadFraccion;


    if(this.product.SePuedeFraccionar ===1){

    if(this.count  < this.product.availibilityCount){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.CantidadFraccion,
      }
      this.changeQuantity(obj);
    }

    // console.log(this.product.SePuedeFraccionar)


    }

    else{

      if(this.count < this.product.availibilityCount){
        this.count++;
        let obj = {
          productId: this.product.id,
          soldQuantity: this.count,
          total: this.count * this.product.newPrice
        }
        this.changeQuantity(obj);

      }

    }
  }


  public addToCompare(product:Product){
    this.appService.addToCompare(product);
  }

  public addToWishList(product:Product){
    this.appService.addToWishList(product);
  }

  public addToCart(product:Product){

    let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
    if(product.SePuedeFraccionar)
    {

      if(currentProduct)
      {
        let countLocal=1/product.CantidadFraccion;

        if((currentProduct.cartCount + countLocal) <= this.product.availibilityCount){
          product.cartCount = parseFloat( (currentProduct.cartCount + countLocal).toFixed(3));
          product.cartCount2=parseFloat( (currentProduct.cartCount2+this.count).toFixed(3));

          if(product.cartCount2%product.CantidadFraccion===0)
          {

            product.cartCount=Math.floor(product.cartCount2/product.CantidadFraccion);
          }

        }
        else{
          this.snackBar.open('No se pueden agregar más artículos de los disponibles. En stock ' + this.product.availibilityCount + ' elementos y ya agregaste' + currentProduct.cartCount + ' artículo a tu carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
          return false;
        }

      }
      else{
        console.log(product);
        let countLocal2=parseFloat(( 1/product.CantidadFraccion).toFixed(3));

        product.cartCount=countLocal2;
        product.cartCount2=this.count;
      }

      var decimalPart = product.cartCount - Math.floor(product.cartCount); // Obtén la parte decimal del número
      let micartcount:number;
      //alert(decimalPart.toFixed(2)+" | "+parseFloat(((1/product.CantidadFraccion).toFixed(2))));
       if (parseFloat(decimalPart.toFixed(2)) < parseFloat(((1/product.CantidadFraccion).toFixed(2)))) {
         // Redondea hacia abajo si la parte decimal es menor que 0.05
         micartcount= Math.floor(product.cartCount);
       }
       else{
        let midecimal=product.cartCount-Math.floor(product.cartCount);

        if(midecimal >.47 && midecimal<=.51)
        {
          product.cartCount=Math.floor(product.cartCount);
          product.cartCount=product.cartCount+.50;
        }
         micartcount=product.cartCount;
       }
       product.cartCount=micartcount;



    }
    else{
    if(currentProduct){

      if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
        product.cartCount = currentProduct.cartCount + this.count;
        console.log(product.cartCount);
      }
      else{
        this.snackBar.open('No se pueden agregar más artículos de los disponibles. En stock ' + this.product.availibilityCount + 'elementos y ya agregaste ' + currentProduct.cartCount + ' artículo a tu carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cartCount = this.count;
    }
  }


  this.appService.addToCart(product);

  // this.compraAgregada.emit(product);
  // this.compraSeleccionada = product;
  // this.mostrarDetalles = true;

  }


  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }


  public changeQuantity(value){
      this.onQuantityChange.emit(value);
  }

}
