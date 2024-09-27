import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { designOrderDTO } from 'src/app/Models/design-order';
import { BookingService } from 'src/app/Services/booking.service';
import { SharedService } from 'src/app/Services/shared.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component'

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})

export class ListPostsComponent {
  displayedColumns: any = ['position', 'orderDate', 'agency', 'contactPerson', 'contactMail', 'contactPhone', 'workType', 'orderState', 'viewDetail']
  //dataSource: any = ELEMENT_DATA;
  dataSource = new MatTableDataSource<designOrderDTO>()
  currentLang: string = ""


  constructor( private postService: BookingService, private sharedService: SharedService, private matDialog: MatDialog ) {
    this.loadPosts();
  }

  ngOnInit() {
    switch ( localStorage.getItem('preferredLang') ) {
      case 'ca-ES':
        this.currentLang = 'ca-ES'
      break
      case 'es-ES':
        this.currentLang = 'es-ES'
      break
      case 'en-EN':
        this.currentLang = 'en-EN'
      break
      default:
        this.currentLang = 'ca-ES'

    }
  }
  
  @ViewChild(MatSort) sort: MatSort;

  private loadPosts(): void {
    let errorResponse: any
    let actionDone: string = ""
    let responseOK: boolean = false
    this.postService.getAllDesignRequests()
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
        (requests: designOrderDTO[]) => {
          this.dataSource.data = requests
          responseOK = true
          actionDone = "Data listed"
        },
        (error: HttpErrorResponse) => {
          if ( error.message.includes('Http failure during parsing for') ) {
            responseOK = false
            actionDone = "No data found to list"
          }
          finalize(async () => {
            await this.sharedService.managementToast( 'postFeedback', responseOK, error )
          })
        }
      );
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, dialogTitle: string, rowData: Event): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.panelClass = "dialog-customization"
    dialogConfig.backdropClass = "popupBackdropClass"
    dialogConfig.position = {
      'top': '2rem',
      'right': '5rem'
    };
    dialogConfig.width='100%',
    dialogConfig.data = { dialogTitle: dialogTitle, dialogData: rowData }
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }
  
}


export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}




export interface designOrder {
  position: number
  orderDate: string
  agency: string
  contactPerson: string
  contactMail: string
  contactPhone: string
  workType: string
  /* description: string */
  orderState?: string
}

const currDate: Date = new Date();
const orderDate: string = currDate.toDateString(); 

const ELEMENT_DATA: designOrder[] = [
  {position: 1, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 2, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 3, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 4, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 5, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 6, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 7, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 8, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 9, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 10, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 1, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 2, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 3, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 4, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 5, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 6, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 7, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 8, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 9, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
  {position: 10, orderDate, agency: 'Agència de Desenvolupament Regional de les Illes Balears (ADR Balears)', contactPerson: 'ignacio lladó vidal', contactMail: 'nachollv@hotmail.com', contactPhone: '999999999', workType: 'Revisar cartell', orderState: 'pending'},
];