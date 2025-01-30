import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  async managementToast( element: string, validRequest: boolean, error?: HttpErrorResponse, actionDone?: string ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk'
        if (actionDone === 'booking') {
          switch ( localStorage.getItem('preferredLang') ) {
            case 'ca':
              toastMsg.innerHTML = 'Sol·licitud de reserva realitzada correctament'
            break
            case 'es':
              toastMsg.innerHTML = 'Solicitud de reserva realizada correctamente.'
            break
            case 'en':
              toastMsg.innerHTML = 'Reservation application made correctly.'
            break
            default:
              toastMsg.innerHTML = 'Solicitud de reserva realizada correctamente.'
          }
        } else {
        switch ( localStorage.getItem('preferredLang') ) {
          case 'ca':
            toastMsg.textContent = actionDone
          break
          case 'es':
            toastMsg.textContent = actionDone
          break
          case 'en':
            toastMsg.textContent = actionDone
          break
          default:
            toastMsg.textContent = actionDone
        }
        }
        await this.wait(100000);
        toastMsg.className = toastMsg.className.replace('show', '')
      } else {/* cuando NO ha ido bien: requestKo */
        toastMsg.className = 'show requestKo'
        if (error?.status) {/* si se trata de una reserva */
          if (actionDone === 'booking' || actionDone === 'availability') {
            switch (error.error) {
              case 'NO_AVAILABILITY':
                toastMsg.innerHTML = "<strong>NO HI HA DISPONIBILITAT.</strong><br>"
            }
            toastMsg.innerHTML += error?.message
          } else {
          toastMsg.innerHTML = 'Error. Message: ' + error?.name + '. Status text: ' + error?.statusText + '. Status code: ' + error?.status
        }
        } else {
          if (actionDone === 'booking' || actionDone === 'availability') {
            switch (error.error) {
              case 'NO_AVAILABILITY':
                toastMsg.innerHTML = "<strong>NO HI HA DISPONIBILITAT.</strong><br>"
            }
            toastMsg.innerHTML += error?.message
          } else {
          toastMsg.innerHTML = 'Error. Message: ' + error?.name + '. Status text: ' + error?.statusText;
          }
        }
        await this.wait(100000);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: HttpErrorResponse): void {
    console.log (error)
    console.error('ok:', error.ok);
    console.error('type:', error.name);
    console.error('status:', error.status);
    console.error('statusText:', error.statusText);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
