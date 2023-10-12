import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { Md5 } from 'ts-md5';

import { SupportService } from 'src/app/admin/support/service/support.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: UntypedFormGroup;
  registerForm: UntypedFormGroup;
  public errorlogin:boolean=false;

  constructor(private spinner:NgxSpinnerService,public formBuilder: UntypedFormBuilder, public router:Router, public snackBar: MatSnackBar,public authService:SupportService) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    // this.registerForm = this.formBuilder.group({
    //   'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    //   'email': ['', Validators.compose([Validators.required, emailValidator])],
    //   'password': ['', Validators.required],
    //   'confirmPassword': ['', Validators.required]
    // },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
      if (this.loginForm.valid) {
    const{email,password}=this.loginForm.value;
    this.authService.GetLoginAuth(email,this.Encriptpass(password)).subscribe(ok=>{
      if ( ok == true ) {

       this.errorlogin=false;
        this.router.navigate(['/productos']); // esto es para que me redireccione a ventas cuando inicio sesion
       // window.location.reload();
      }
      else {
        this.spinner.hide();
        this.errorlogin=true;
    //     setTimeout(() => {
    //   window.location.reload();
    // }, 500);

      }

    });
  }
    // if (this.loginForm.valid) {
    //   this.router.navigate(['/']);
    // }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  Encriptpass(text:string):string {
    const md5 = new Md5();
    return md5.appendStr(text.toString().trim()).end().toString();
 }


 //Aqui va lo mio

 recuperarPass(){
  this.router.navigate(['/modificarPass']);
 }

}

