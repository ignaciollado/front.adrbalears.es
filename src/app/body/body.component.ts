import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  currentLang: string ="es";
  constructor(private titleService:Title) {
    this.titleService.setTitle("ADR Balears, some services");
    }

    ngOnInit(): void {
 /*      this.currentLang = localStorage.getItem('preferredLang')
      console.log ("body component:", this.currentLang) */
  }
}
