import { Component } from '@angular/core';
import { PrimeNgModule } from '../../shared/modules/prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadCrambComponent } from '../bread-cramb/bread-cramb.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeNgModule, BreadCrambComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  ngOnInit() {

  }
}
