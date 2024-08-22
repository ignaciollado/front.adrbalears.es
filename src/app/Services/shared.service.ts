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

  async managementToast( element: string, validRequest: boolean, error?: HttpErrorResponse ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.textContent = 'Booking submitted in PENDING state.';
        await this.wait(4500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        if (error?.status) {
          toastMsg.textContent =
            'Error on form submitted. Message: ' +
            error?.message +
            '. Message detail: ' +
            error?.statusText +
            '. Status code: ' +
            error?.status;
        } else {
          toastMsg.textContent =
            'Error on form submitted. Message: ' +
            error?.message +
            '. Status text: ' +
            error?.statusText;
        }

        await this.wait(4500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: HttpErrorResponse): void {
    console.error('name:', error.name);
    console.error('type:', error.type);
    console.error('message:', error.message);
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
