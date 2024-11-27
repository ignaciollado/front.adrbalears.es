import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable, catchError } from 'rxjs';
import { BookingDTO } from '../Models/booking.model';
import { designOrderDTO } from '../Models/design-order';
import { BookingAdrBalearsDTO } from '../Models/booking.model';
import { WpPost } from '../Models/wp-post-data.dto';

const URL_API = '../../assets/phpAPI/'

const PRE_URL_BACKOFFICE = "https://pre.backoffice.idi.es/api"
const URL_BACKOFFICE = "https://backoffice.idi.es/api"
const token_bearer = "MEN2024*@"
const httpOptionsADRBalears = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${token_bearer}`
  })
}

const WPpageURL = 'https://app.adrbalears.es/wp-json/wp/v2/pages';
const headers = new HttpHeaders()
      .set( 'Content-Type', 'application/vnd.api+json' ) 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain' /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
}

export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  
  constructor(
      private http: HttpClient,
      private sharedService: SharedService
            ) { }

  getAllBookings(): Observable<BookingDTO[]> {
    return this.http
      .get<BookingDTO[]>(`${URL_API}bookingGetAll.php`, httpOptions)
  }

  getAllBookingsByClient(companyId:any): Observable<BookingDTO[]> {
    return this.http
      .get<BookingDTO[]>(`${URL_API}bookingGetByClient.php?companyId=${companyId}`, httpOptions)
  }

  getBookingByResource(resource: string): Observable<BookingDTO[]> {
    return this.http
      .get<BookingDTO[]>(`${URL_API}bookingGetByResource.php?resource=${resource}`)
  }

  getBookingById(bookingId: string): Observable<BookingDTO> {
    return this.http
      .get<BookingDTO>(`${URL_API}bookingGetById.php?bookingId=${bookingId}`)
  }

  createBooking(booking: BookingDTO): Observable<BookingDTO> {
    return this.http
      .post<BookingDTO>(`${URL_API}bookingCreate.php`, booking)
      .pipe(catchError(this.sharedService.handleError));
  }

  createDesignRequest(booking: designOrderDTO): Observable<designOrderDTO> {
    return this.http
      .post<designOrderDTO>(`${URL_API}designOrderCreate.php`, booking)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllDesignRequests(): Observable<designOrderDTO[]> {
    return this.http
      .get<designOrderDTO[]>(`${URL_API}designOrdersGetAll.php`, httpOptions)
  }

  getAllDesignRequestsByClient(companyId:any): Observable<designOrderDTO[]> {
    return this.http
      .get<designOrderDTO[]>(`${URL_API}designOrderGetByClient.php?companyId=${companyId}`, httpOptions)
  }

  getDesignRequestById(orderID: string): Observable<designOrderDTO> {
    console.log("id:", orderID)
    return this.http
      .get<designOrderDTO>(`${URL_API}designOrderGetById.php?orderID=${orderID}`)
  }

  updateDesignRequest(orderID: string, newState: string): Observable<any> {
    return this.http
      .patch<designOrderDTO>(`${URL_API}designOrderUpdate.php?orderID=${orderID}&newState=${newState}`, newState)
  }

  updateBooking(bookingId: string, booking: BookingDTO): Observable<BookingDTO> {
    return this.http
      .put<BookingDTO>(`${URL_API}bookingUpdate.php?bookingId=${bookingId}`, booking)
  }

  deleteBooking(bookingId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(`${URL_API}bookingDelete.php?bookingId=${bookingId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  /* Obtener un contenido del gestor CMS app.adrbalears.es */
  getOneContent(id: string|null): Observable<WpPost> {
    return this.http.get<WpPost>(`${WPpageURL}/${id}`, { headers: headers })
  }
  /* -------------------------------------------------------------------------------------------------------- */
  /* BACKOFFICE ADR Balears */

  getAllBookingsADRBalears(): Observable<BookingAdrBalearsDTO[]> {
    return this.http
      .get<BookingAdrBalearsDTO[]>(`${PRE_URL_BACKOFFICE}/booking`, httpOptionsADRBalears)
  }

  getBookingByIdADRBalears(bookingId: string): Observable<BookingAdrBalearsDTO> {
    return this.http
      .get<BookingAdrBalearsDTO>(`${PRE_URL_BACKOFFICE}/booking/Locator=${bookingId}`, httpOptionsADRBalears)
  }

  getCheckAvailabilityADRBalears(bki_id: string, boo_start: Date, boo_end: Date): Observable<BookingAdrBalearsDTO> {
    let pro_id:number = 42
    return this.http
      .get<BookingAdrBalearsDTO>(`${PRE_URL_BACKOFFICE}/booking/-1/checkavailability`)
  }

}
