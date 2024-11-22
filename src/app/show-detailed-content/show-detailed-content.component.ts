import { Component } from '@angular/core';
import { BookingDTO } from '../Models/booking.model';
import { BookingService } from '../Services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { WpPost } from '../Models/wp-post-data.dto';

@Component({
  selector: 'app-show-detailed-content',
  templateUrl: './show-detailed-content.component.html',
  styleUrls: ['./show-detailed-content.component.scss']
})
export class ShowDetailedContentComponent {
  currentLang: string = ""
  public theContent: WpPost

  constructor( private contentsService: BookingService, private route: ActivatedRoute, ) {}

  ngOnInit() {
    let id:string | null = this.route.snapshot.paramMap.get('id')
    this.currentLang = localStorage.getItem('preferredLang')
    this.loadContent(id)
   }

  loadContent(id: string) {
    this.contentsService.getOneContent(id)
    .subscribe((itemContent:WpPost) => {
      this.theContent = itemContent
    })
  }

}
