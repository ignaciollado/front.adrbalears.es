import { Time } from "@angular/common"

export class BookingDTO {
    bookingId!: string
    idCard: number
    name: string
    email: string
    resource: string
    fromDate: Date
    fromTime: string
    toTime: string
    toDate: Date
    allDay: boolean
    state: string


    constructor(
        fromDate: Date,
        fromTime: string,
        toTime: string,
        toDate: Date,
        idCard: number,
        name: string,
        email: string,
        resource: string,
        allDay: boolean,
        state: string
      ) {

        this.fromDate = fromDate,
        this.fromTime = fromTime,
        this.toTime = toTime,
        this.toDate = toDate,
        this.idCard = idCard,
        this.name = name,
        this.email = email,
        this.resource = resource,
        this.allDay = allDay,
        this.state = state
      }
}
