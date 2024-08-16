import { Time } from "@angular/common"

export class BookingDTO {
    bookingId!: string
    idCard: number
    name: string
    email: string
    resource: string
    fromDate: Date
    fromDateFromTime!: string
    toDate: Date
    toDateToTime!: string
    allDay!: boolean
    state!: string


    constructor(
        idCard: number,
        name: string,
        email: string,
        resource: string,
        fromDate: Date,
        toDate: Date,
      ) {
        this.idCard = idCard,
        this.name = name,
        this.email = email,
        this.resource = resource,
        this.fromDate = fromDate,
        this.toDate = toDate
      }
}
