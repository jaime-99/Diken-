import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ValidarTokenGuard } from './guards/validarlogin.guard';
import { misPedidosModule } from './pages/misPedidos/misPedidos.component.module';
// import { modificarPass } from './pages/modificarPass/modificarPass.component';
import { modificarPassModule } from './pages/modificarPass/modificarPass.module';
import { formularioPassModule } from './pages/formularioPass/formularioPass.component.module';
import { pedidosConsolidadosModule } from './pages/pedidos_consolidados/pedidos-consolidados/pedidos.component.module';
import { ManualDeUsuarioModule } from './pages/manual-de-usuario/manualDeUsuarioPDF.component.module';
import { NuloMovimientoModule } from './pages/nuloMovimiento/nulo-movimiento/nulo-movimiento.module';
import {AccessGuard} from './guards/access.guard'
import { CaducaContraModule } from './pages/caducaContra/caducaContra.module';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'sign-in',  // es para que al inicio se coloque la pagina
    pathMatch: 'full'
},
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), data: { breadcrumb: 'Configuracion de Cuenta' } },
            { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule), data: { breadcrumb: 'Comparar' } },
            { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule), data: { breadcrumb: 'Deseos' } },
            { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),

            canActivate: [ ValidarTokenGuard ],
            canLoad: [ ValidarTokenGuard ]
            , data: { breadcrumb: 'Carrito' } },
            { path: 'cotizacion', loadChildren: () => import('./pages/cotizacion/cotizacion.module').then(m => m.CotizacionModule)
            ,
            canActivate: [ ValidarTokenGuard ],
            canLoad: [ ValidarTokenGuard ]
            , data: { breadcrumb: 'Cotización' } },
            { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule), data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'ContactO' } },
            //{ path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Inicio de sesión ' } },
            { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Brands' } },
            { path: 'productos', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), canActivate: [ AccessGuard ], data: { breadcrumb: 'Todos los Productos' }  },
            { path: 'catalogo',loadChildren:()=>import('./pages/catalogos/catalogos.module').then(m=>m.CatalogosModule), data:{breadcrumb:'Catálogo Alimentos'}},
            { path: 'catalogoscadenas',loadChildren:()=>import('./pages/catalogoscadenas/catalogoscadenas.module').then(m=>m.CatalogoscadenasModule),data:{breadcrumb:'Catálogo Cadenas'}},
            { path: 'catalogosindustrial',loadChildren:()=>import('./pages/catalogosindustrial/catalogosindustrial.module').then(m=>m.CatalogosindustrialModule),data:{breadcrumb:'Catálogo Industrial'}},
            { path: 'quienessomos',loadChildren:()=>import('./pages/quienessomos/quienessomos.module').then(m=>m.QuienessomosModule),data:{breadcrumb:'Quienes somos'}},
            { path: 'sucursales',loadChildren:()=>import('./pages/sucursales/sucursales.module').then(m=>m.SucursalesModule),data:{breadcrumb:'Sucursales'}},
            { path: 'ventas', loadChildren: () => import('./pages/ventaEmpleado/ventaEmpleado.module').then(m => m.VentaEmpleadoModule), data: { breadcrumb: 'ventas Empleado' } },
            { path: 'misPedidos', loadChildren: () => import('./pages/misPedidos/misPedidos.component.module').then(m => misPedidosModule), data: { breadcrumb: 'Todos Mis Pedidos' } },
            { path: 'pedidosConsolidados', loadChildren: () => import('./pages/pedidos_consolidados/pedidos-consolidados/pedidos.component.module').then(m => pedidosConsolidadosModule), data: { breadcrumb: 'Pedidos consolidados' } },
            { path: 'manualDeUsuario', loadChildren: () => import('./pages/manual-de-usuario/manualDeUsuarioPDF.component.module').then(m => ManualDeUsuarioModule), data: { breadcrumb: 'Manual De Usuario' } },
            { path: 'nuloMovimiento', loadChildren: () => import('./pages/nuloMovimiento/nulo-movimiento/nulo-movimiento.module').then(m => NuloMovimientoModule), data: { breadcrumb: 'Nulo Movimiento' } },


            { path: 'plataformas',loadChildren:()=>import('./pages/plataformas/plataformas.module').then(m=>m.PlataformasModule),
            canActivate: [ ValidarTokenGuard ],
            canLoad: [ ValidarTokenGuard ]

            ,data:{breadcrumb:'Plataformas Digitales'}},
            { path: 'unidiken',loadChildren:()=>import('./pages/unidiken/unidiken.module').then(m=>m.UnidikenModule),data:{breadcrumb:'Universidad Diken'}}
        ]
    },
    { path: 'modificarPass', loadChildren: () => import('./pages/modificarPass/modificarPass.module').then(m => modificarPassModule)},
    { path: 'formularioPass', loadChildren: () => import('./pages/formularioPass/formularioPass.component.module').then(m => formularioPassModule)},
    { path: 'caduca_contras', loadChildren: () => import('./pages/caducaContra/caducaContra.module').then(m => CaducaContraModule)},

    { path:'sign-in',loadChildren:()=>import('./pages/sign-in/sign-in.module').then(m=>m.SignInModule)},
    { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [ ValidarTokenGuard ],
        canLoad: [ ValidarTokenGuard ]
     },
    { path:'rhnet',loadChildren:()=>import('./admin-rhnet/admin-rhnet.module').then(m=>m.AdminRhnetModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
    },
    { path:'mesadeayuda',loadChildren:()=>import('./admin-mesadeayuda/admin-mesadeayuda.module').then(m=>m.AdminMesadeayudaModule),
            canActivate: [ ValidarTokenGuard ],
            canLoad: [ ValidarTokenGuard ]

},
{path:'bigdata',loadChildren:()=>import('./admin-bigdata/admin-bigdata.module').then(m=>m.AdminBigdataModule)},

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
            relativeLinkResolution: 'legacy',
            initialNavigation: 'enabledBlocking', // for one load page, without reload
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
