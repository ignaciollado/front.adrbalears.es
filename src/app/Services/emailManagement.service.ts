import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_API = 'https://emailvalidation.abstractapi.com/v1/?api_key=0b27a379af684fa9bd8c0a672c535d3d'
const URL_API_SEND = 'https://tramits.idi.es/public/assets/utils/enviaCorreoElectronicoReservasMenorca.php'
export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})

export class EmailManagementService {

  constructor(private http: HttpClient) {}

  validateThisEmail(emailAddress: string): Observable<any> {
    return this.http
      .get<any>(`${URL_API}&email=${emailAddress}` )
  }

  sendCustomerEmail(registerForm: any): Observable<any> {
    console.log (registerForm.value)
    const email: string = registerForm.value.boo_company.email
    const name: string = registerForm.value.boo_company.contact
    const phone: string = "**"
    const title: string = registerForm.value.boo_title
    let fromDate: string = registerForm.value.boo_start.toLocaleDateString('es')
    const fromDateFromTime: string = registerForm.value.fromDateFromTime
    let toDate: string = registerForm.value.boo_end.toLocaleDateString('es')

    const toDateToTime: string = registerForm.value.toDateToTime
    const subjectTxt: string = "Reserva al RECINTE EMPRESARIAL DE MENORCA"
    let resourceBooked: string = registerForm.value.bki_id
    const projectName: string = "RECINTE EMPRESARIAL DE MENORCA"
    console.log ("titulo: ", title)

    switch (resourceBooked) {
      case '3':
        resourceBooked = "SALA BLANCA"
        break
      case '4':
        resourceBooked = "SALA GROGA"
        break
      case '5':
        resourceBooked = "SALA VERMELLA"
        break
      case '6':
        resourceBooked = "SALA BLAVA"
        break
      case '7':
        resourceBooked = "Pavelló Exposició A"
        break
      case 'B-pavillion':
        resourceBooked = "Pavelló Exposició B"
        break
      case 'AB-pavillion':
        resourceBooked = "Pavelló Exposició A i B"
        break
    }

    resourceBooked = resourceBooked +"_"+ fromDate.replaceAll("/","-") +"_"+ fromDateFromTime +"_"+ toDate.replaceAll("/","-") +"_"+ toDateToTime +"_"+ title

    return this.http
      .get<any>(`${URL_API_SEND}?${email}/${name}/${phone}/${subjectTxt}/${resourceBooked}/${projectName}`)
  }

  errorLog(error: HttpErrorResponse): void {
    console.error('An error occurred:', error.error.msg);
    console.error('Backend returned code:', error.status);
    console.error('Complete message was:', error.message);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

}
