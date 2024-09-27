import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { designOrderDTO } from 'src/app/Models/design-order';
import { BookingService } from 'src/app/Services/booking.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent {
  isPdf1: boolean = false
  isPdf2: boolean = false
  confirmDialog: boolean = false
  orderDetail: designOrderDTO

  constructor( public dialogRef: MatDialogRef<ConfirmDialogComponent>, private orderService: BookingService, private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: {dialogTitle: string, dialogData: any, confirmDialog?: boolean}
    ) {
      this.getOrderDetail (data.dialogData.position)
      this.confirmDialog = data.confirmDialog
     }
    
    onCommand(): void {
      this.dialogRef.close(true);
    }

    getOrderDetail (id:string) {
      let errorResponse: any
      let actionDone: string = ""
      let responseOK: boolean = false
      this.orderService.getDesignRequestById(id)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'postFeedback',
            responseOK,
            errorResponse, actionDone
          )
        })
      )
      .subscribe(
        (orderDetail: designOrderDTO) => {
        this.orderDetail = orderDetail
        responseOK = true
        actionDone = "Data listed"
        console.log (this.orderDetail)
      },
      (error: HttpErrorResponse) => {
        if ( error.message.includes('Http failure during parsing for') ) {
          responseOK = false
          actionDone = "No data found to show in detail"
        }
        finalize(async () => {
          await this.sharedService.managementToast( 'postFeedback', responseOK, error )
        })
      })
    }

    setStatus(orderID:string, newState: string) {
      this.orderService.updateDesignRequest(orderID, newState)
      .subscribe()
    }
}
