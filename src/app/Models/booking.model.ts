import { Time } from "@angular/common"

export class BookingDTO {
    bookingId!: string
    idCard: number
    name: string
    email: string
    resource: string
    fromDate: Date
    fromDateFromTime!: number
    toDate: Date
    toDateToTime!: number
    allDay!: boolean
    state: string
    acceptTerms: boolean


    constructor (
      idCard: number,
      name: string,
      email: string,
      resource: string,
      fromDate: Date,
      toDate: Date,
      state: string,
      acceptTerms: boolean
    ) {
      this.idCard = idCard,
      this.name = name,
      this.email = email,
      this.resource = resource,
      this.fromDate = fromDate,
      this.toDate = toDate,
      this.state = state,
      this.acceptTerms = acceptTerms
    }
}
