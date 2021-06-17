import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import emailjs from 'emailjs-com';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  myForm: FormGroup;

  constructor(
    private _MessageService: MessageService,
    public translate: TranslateService,
    public fb: FormBuilder
  ) {

    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
    this.myForm.valueChanges.pipe(debounceTime(1500)).subscribe((value) => {
      this._MessageService.verifyEmail(value.email).subscribe((data) => {
        this.emailVerify = data.smtp_check;
        console.log(this.emailVerify+ 'EMAILLLLVERIFYYY!!!');
      });
    });
  }

  public emailVerify = true;


  sendEmail = (e: Event) => {
    e.preventDefault();
    emailjs
      .sendForm(
        environment.serviceId,
        environment.templateId,
        e.target as HTMLFormElement,
        environment.userId
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire('Gracias!', 'El mensaje se envio correctamente', 'success');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
}
