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
    const email: string = registerForm.bookerEMail
    const name: string = registerForm.bookerName
    const phone: string = "**"
    let fromDate: string = registerForm.fromDate.toLocaleDateString('es-ES')

    const fromDateFromTime: string = registerForm.fromDateFromTime
    let toDate: string = registerForm.toDate.toLocaleDateString('es-ES')

    const toDateToTime: string = registerForm.toDateToTime
    const subjectTxt: string = "Reserva al recinte de Menorca"
    let resourceBooked: string = registerForm.resourceToBook
    const projectName: string = "Recinte de Menorca"

    switch (resourceBooked) {
      case 'white-room':
        resourceBooked = "SALA BLANCA"
        break
      case 'yellow-room':
        resourceBooked = "SALA GROGA"
        break
      case 'red-room':
        resourceBooked = "SALA VERMELLA"
        break
      case 'blue-room':
        resourceBooked = "SALA BLAVA"
        break
      case 'A-pavillion':
        resourceBooked = "PAVILLION A"
        break
      case 'B-pavillion':
        resourceBooked = "PAVILLION B"
        break
      case 'AB-pavillion':
        resourceBooked = "PAVELLONS A i B"
        break

    }

    resourceBooked = resourceBooked +"_"+ fromDate.replaceAll("/","-") +"_"+ fromDateFromTime +"_"+ toDate.replaceAll("/","-") +"_"+ toDateToTime

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
