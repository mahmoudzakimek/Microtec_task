import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = true;
  _loaderService = inject(LoaderService)

  ngOnInit(): void {
    this._loaderService.loading$.subscribe(
      (isLoading) => this.isLoading = isLoading
    );
  }
}
