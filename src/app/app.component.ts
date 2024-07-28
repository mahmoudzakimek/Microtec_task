import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterEvent, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LoaderComponent } from './layout/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, LoaderComponent, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'maicro_task';
  isLoading = true;

  // constructor() {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1500);
  // }


  constructor(private renderer: Renderer2, private el: ElementRef) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

  }

  ngAfterViewInit(): void {
    this.initSidebarEvents();
  }

  private initSidebarEvents() {
    const sidebarDropdowns = this.el.nativeElement.querySelectorAll('.sidebar-dropdown > a');
    sidebarDropdowns.forEach((dropdown: HTMLElement) => {
      this.renderer.listen(dropdown, 'click', () => {
        const submenu = dropdown.nextElementSibling as HTMLElement;
        if (submenu) {
          submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
        }
        const parent = dropdown.parentElement;
        if (parent) {
          if (parent.classList.contains('active')) {
            this.renderer.removeClass(parent, 'active');
          } else {
            this.renderer.addClass(parent, 'active');
          }
        }
      });
    });

    const closeSidebarButton = this.el.nativeElement.querySelector('#close-sidebar');
    const showSidebarButton = this.el.nativeElement.querySelector('#show-sidebar');
    const pageWrapper = this.el.nativeElement.querySelector('.page-wrapper');

    if (closeSidebarButton && pageWrapper) {
      this.renderer.listen(closeSidebarButton, 'click', () => {
        this.renderer.removeClass(pageWrapper, 'toggled');
      });
    }

    if (showSidebarButton && pageWrapper) {
      this.renderer.listen(showSidebarButton, 'click', () => {
        this.renderer.addClass(pageWrapper, 'toggled');
      });
    }
  }
}



