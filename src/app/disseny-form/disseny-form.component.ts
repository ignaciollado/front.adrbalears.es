import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MessageService } from '../Services/message.service';

import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../Services/shared.service';
import { finalize } from 'rxjs';
import {Title} from "@angular/platform-browser";
import { BookingService } from '../Services/booking.service';
import { designOrderDTO } from '../Models/design-order';

@Component({
  selector: 'app-disseny-form',
  templateUrl: './disseny-form.component.html',
  styleUrls: ['./disseny-form.component.scss']
})
export class DissenyFormComponent {
  contactForm: FormGroup
  formData: designOrderDTO
  submitted: boolean = false
  currentLang: string = ""

  constructor(private formBuilder: FormBuilder, private sendMail: MessageService, 
              private sharedService: SharedService, 
              private titleService:Title, private bookingService: BookingService) { 
    this.titleService.setTitle("ADR Balears, Departament de disseny");
    this.formData = new designOrderDTO('', '', '', '', '', '', '')
  }

  ngOnInit() {
    switch ( localStorage.getItem('preferredLang') ) {
      case 'ca-ES':
        this.currentLang = 'ca-ES'
      break
      case 'es-ES':
        this.currentLang = 'es-ES'      
      break
      case 'en-EN':
        this.currentLang = 'en-EN'
      break
      default:
        this.currentLang = 'ca-ES'
    }

    this.contactForm = this.formBuilder.group({
      agency:  ['', [Validators.required]],
      contactName:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.minLength, Validators.maxLength]],
      workType: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    let errorResponse: any
    let actionDone: string = ""
    let responseOK: boolean = false
    this.submitted = true
    this.formData = this.contactForm.value
    this.bookingService.createDesignRequest(this.formData)
    .pipe(
      finalize(async () => {
        await this.sharedService.managementToast(
          'postFeedback',
          responseOK,
          errorResponse,
          actionDone
        );
        if (responseOK) {
          this.sendMail.sendMail(this.formData,this.formData.body,"Disseny")
          .subscribe((sendMailResult:any) => {
          },
          (error: HttpErrorResponse) => {
            errorResponse = error;
            this.sharedService.errorLog(errorResponse);
          })
        }
      })
    )
    .subscribe(() => {
      responseOK = true
      actionDone = "Request sended successfully!!!"
      this.contactForm.reset()
    },
    (error: HttpErrorResponse) => {
      if ( error.status === 200 ) {
        responseOK = true
      }
      this.sharedService.errorLog(error)
      this.submitted = false
      this.contactForm.reset()
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK, error )
      })
    })
  }
  
}
