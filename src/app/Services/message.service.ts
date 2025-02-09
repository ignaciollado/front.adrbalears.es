import { Injectable } from '@angular/core';
import { genericMailDTO } from '../Models/generic-data.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL_API_SEND = 'https://tramits.idi.es/public/assets/utils/enviaCorreoElectronicoDisseny.php'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain' /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor(private http: HttpClient) { }

  sendMail(formData: any, bodyText: string, project: string): Observable<genericMailDTO[]> {
    const email: string = formData.contactEmail
    const requester: string = formData.contactName
    const caibAgency: string = formData.agency
    const contactPhone: string = formData.contactPhone
    let subject: string = "ADR Balears - contacte"
    const workType: string = formData.workType
    const body: string = formData.body
    const projectContact: string = project

    switch (localStorage.getItem('preferredLang')) {
      case 'en':
        subject = "ADR Balears - Contact"
        break
      case 'es':
        subject = "ADR Balears - Contacto"
        break
      case 'ca':
        subject = "ADR Balears - Contacte"
        break
    }

    return this.http
      .get<genericMailDTO[]>(`${URL_API_SEND}?${email}/${requester}/${contactPhone}/${subject}/${body}/${projectContact}/${caibAgency}/${workType}`, httpOptions)
  }

  add(message: string) {
    this.messages.push(message)
  }

  clear() {
    this.messages = []
  }
  
}

