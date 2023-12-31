import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};
import { AdminRhnetComponent } from '../admin-rhnet/admin-rhnet.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RhMenuComponent } from './components/menu/menu.component'; 
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component'; 

export const routes = [ 
  { 
    path: '', 
    component: AdminRhnetComponent, children: [
      
    ]
  } 
];

@NgModule({
  declarations: [
    AdminRhnetComponent,
    BreadcrumbComponent,
    RhMenuComponent,
    UserMenuComponent,
    FullScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
  ]
})
export class AdminRhnetModule { }
