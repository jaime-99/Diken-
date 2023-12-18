import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-caduca-contra',

  templateUrl: './caducaContra.component.html',
  styleUrls: ['./caducaContra.component.scss'],
})
export class CaducaContraComponent implements OnInit {
  changePasswordForm: FormGroup;


  constructor (private appService:AppService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    let userauth = JSON.parse(localStorage.getItem("datalogin")!);

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: this.passwordsMatchValidator // Custom validator for password match
    });
  }
    // console.log(userauth)

    private passwordsMatchValidator(formGroup: FormGroup) {
      const newPassword = formGroup.get('newPassword').value;
      const confirmNewPassword = formGroup.get('confirmNewPassword').value;

      return newPassword === confirmNewPassword ? null : { passwordsNotMatch: true };
    }


    onSubmit(){



    }

  }





