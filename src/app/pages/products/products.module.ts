import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatIconModule } from '@angular/material/icon';
import { MensajeNuloMovimientoService } from './mensaje-nulo-movimiento.service';



export const routes: Routes = [

  { path: ':page', component: ProductsComponent},
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  
  { path: ':id/:name/:page', component: ProductComponent },
  { path: ':id/:name', component: ProductComponent },

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,

        SwiperModule,
        NgxPaginationModule,
        SharedModule,
        PipesModule,
        MatIconModule,


    ],
    declarations: [
        ProductsComponent,
        ProductComponent,
        ProductZoomComponent
    ],

    exports:[
      ProductsComponent
    ],

    providers:[
      MensajeNuloMovimientoService
    ]




})
export class ProductsModule { }
