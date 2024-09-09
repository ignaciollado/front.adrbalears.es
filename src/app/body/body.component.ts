import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
 
  constructor(private titleService:Title) {
    this.titleService.setTitle("ADR Balears, some services");
    }
}
