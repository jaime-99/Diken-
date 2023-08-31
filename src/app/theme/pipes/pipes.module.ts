import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { ProfilePicturePipe } from './profilePicture.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { ProductSearchPipe } from './products-search.pipe';
import { TiketSearchPipe } from './tiket-search.pipe';
import { CategoriaSearchPipe } from './categoria-search.pipe';
import { BgdClienteSearchPipe } from './BgdCliente-search.pipe';
import { BuscarNombre } from './buscarNombre.pipe';
import { BuscarNombreEmpleado } from './buscarNombreEmpleado.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        ProfilePicturePipe,
        UserSearchPipe,
        ProductSearchPipe,
        TiketSearchPipe,
        CategoriaSearchPipe,
        BgdClienteSearchPipe,
        BuscarNombre,
        BuscarNombreEmpleado
    ],
    exports: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        ProfilePicturePipe,
        UserSearchPipe,
        ProductSearchPipe,
        TiketSearchPipe,
        CategoriaSearchPipe,
        BgdClienteSearchPipe,
        BuscarNombre,
        BuscarNombreEmpleado
    ]
})
export class PipesModule { }
