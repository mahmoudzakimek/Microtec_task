import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bread-cramb',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './bread-cramb.component.html',
  styleUrl: './bread-cramb.component.css'
})
export class BreadCrambComponent {

}
