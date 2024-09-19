import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { designOrderDTO } from 'src/app/Models/design-order';
import { BookingService } from 'src/app/Services/booking.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})

export class ListPostsComponent {
  displayedColumns: any = ['position', 'orderDate', 'agency', 'contactPerson', 'contactMail', 'workType', 'description', 'state'];
  //dataSource: any = ELEMENT_DATA;
  designRequests!: designOrderDTO[];
  dataSource = new MatTableDataSource<designOrderDTO>()

  constructor( private postService: BookingService, private sharedService: SharedService ) {
    this.loadPosts();
  }

  @ViewChild(MatSort) sort: MatSort;


  private loadPosts(): void {
    let errorResponse: any;
    let responseOK: boolean = false
    this.postService.getAllDesignRequests().subscribe(
        (requests: designOrderDTO[]) => {
          this.dataSource.data = requests

          responseOK = true
          finalize(async () => {
            await this.sharedService.managementToast( 'postFeedback', responseOK )
          })
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
         /*  this.sharedService.errorLog(errorResponse) */
          if ( error.status === 200 ) {
            responseOK = true
          }
         /*  this.sharedService.errorLog(error) */
          finalize(async () => {
            await this.sharedService.managementToast( 'postFeedback', responseOK, error )
          })
        }
      );
  }

}

export interface designOrder {
  position: number
  orderDate: string
  agency: string
  contactPerson: string
  contactMail: string
  workType: string
  description: string
  state?: string
}
const currDate: Date = new Date();
const orderDate: string = currDate.toDateString();

const ELEMENT_DATA: designOrder[] = [
  {position: 1, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 2, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 3, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 4, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 5, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 6, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 7, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 8, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 9, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 10, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 1, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 2, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 3, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 4, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 5, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 6, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 7, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 8, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 9, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
  {position: 10, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', workType: 'Revisar cartell', description:'bla bla bla bla cccccc ddddddd', state: 'pending'},
];