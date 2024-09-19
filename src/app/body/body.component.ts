import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  currentLang: string ="en-EN";
  constructor(private titleService:Title) {
    this.titleService.setTitle("ADR Balears, some services");
    }

    ngOnInit(): void {
    
      switch (localStorage.getItem('preferredLang')) {
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
          this.currentLang = 'en-EN'
      }
  }
}
