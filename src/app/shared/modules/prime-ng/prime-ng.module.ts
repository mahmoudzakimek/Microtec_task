import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { SidebarModule, Sidebar } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';

import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [
    MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, MenubarModule, BadgeModule, ToastModule, DropdownModule, AvatarModule, InputTextModule, RippleModule, TableModule, InputGroupModule, InputIconModule, ButtonModule, InputGroupAddonModule, IconFieldModule, SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, InputNumberModule, TagModule
  ],
  exports: [
    InputIconModule, ButtonModule, MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, ToastModule, DropdownModule, TableModule, InputGroupModule, InputGroupAddonModule, IconFieldModule, StyleClassModule, InputNumberModule, TagModule
  ]
})
export class PrimeNgModule { }
