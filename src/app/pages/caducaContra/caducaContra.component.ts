import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-caduca-contra',

  templateUrl: './caducaContra.component.html',
  styleUrls: ['./caducaContra.component.scss'],
})
export class CaducaContraComponent implements OnInit {
  changePasswordForm: FormGroup;
  contraVieja = 'contrasenia';
  oldPasswordInvalid: boolean = false;
passwordsNotMatch: boolean = false;
  nuevaContrasenia: any;



  constructor (private appService:AppService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    let userauth = JSON.parse(localStorage.getItem("datalogin")!);
    this.contraVieja = userauth.data.password
    console.log("esta es la contrasniea vieja", this.contraVieja)
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      // validator: this.passwordsMatchValidator
      validator: this.passwordsMatchValidator.bind(this)

    });
  }
    // console.log(userauth)

    private passwordsMatchValidator(formGroup: FormGroup) {
      const currentPassword = formGroup.get('currentPassword').value;
      const newPassword = formGroup.get('newPassword').value;
      const hashedPassword = Md5.hashStr(currentPassword).toString();

      const confirmNewPassword = formGroup.get('confirmNewPassword').value;
      this.nuevaContrasenia = confirmNewPassword

      this.oldPasswordInvalid = formGroup.get('currentPassword').touched && hashedPassword !== this.contraVieja;
      this.passwordsNotMatch = formGroup.get('confirmNewPassword').touched && newPassword !== confirmNewPassword;

      if (this.oldPasswordInvalid) {
        return { oldPasswordInvalid: true };
      }
      if(this.passwordsNotMatch){
        return {passwordsNotMatch: true};
      }

      // return this.passwordsNotMatch ? { passwordsNotMatch: true } : null;
    }



    onSubmit(){

      const nueva = Md5.hashStr(this.nuevaContrasenia).toString();
      console.log(nueva)

      if(this.changePasswordForm.valid){

        const formData = {
          p_UsuarioId:'1128',
          p_Password: nueva
        }

        this.appService.cambiarContraseniaNuevo(formData).subscribe((res)=>{
          console.log(res)
        })




      }



    }

  }





