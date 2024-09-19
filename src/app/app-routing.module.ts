import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalendarChildComponent } from './booking-calendar-child/booking-calendar-child.component';
import { DissenyFormComponent } from './disseny-form/disseny-form.component';
import { BodyComponent } from './body/body.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';

const routes: Routes = [
  { path: "disseny", component: DissenyFormComponent},
  { path: 'listDesignRequests', component: ListPostsComponent},
  { path: "menorca", component: BookingCalendarChildComponent},
  { path: '*', component: BodyComponent },
  { path: '', component: BodyComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
