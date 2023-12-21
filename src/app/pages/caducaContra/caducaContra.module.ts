import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaducaContraComponent } from './caducaContra.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



export const routes: Routes = [
  { path: '', component: CaducaContraComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [CaducaContraComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule


  ]
})
export class CaducaContraModule { }
