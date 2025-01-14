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
    console.log ("en shared service: ", validRequest, error.status, error.message, actionDone)
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        switch ( localStorage.getItem('preferredLang') ) {
          case 'ca-ES':
            toastMsg.textContent = actionDone
          break
          case 'es-ES':
            toastMsg.textContent = actionDone
          break
          case 'en-EN':
            toastMsg.textContent = actionDone
          break
          default:
            toastMsg.textContent = actionDone
        }

        await this.wait(4500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        if (error?.status) {
          if (actionDone === 'booking') {
            toastMsg.textContent =
            'Booking: ' +
            error?.status+
            ' Message: ' +
            error?.message + ' error: '+ error?.error
          } else {
          toastMsg.textContent =
            'Error. Message: ' +
            error?.name +
            '. Status text: ' +
            error?.statusText +
            '. Status code: ' +
            error?.status;
        }
        } else {
          toastMsg.textContent =
            'Error. Message: ' +
            error?.name +
            '. Status text: ' +
            error?.statusText;
        }
        await this.wait(206500);
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
