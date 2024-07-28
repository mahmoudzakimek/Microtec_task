import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { PrimeNgModule } from '../../shared/modules/prime-ng/prime-ng.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../../shared/services/loader.service';
import { UserService } from '../../shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PrimeNgModule,],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [MessageService]

})
export class ListUsersComponent {
  users = signal<any[]>([]);
  filteredUsers = signal<any[]>([]);
  searchTerm = signal<string>('');

  _loader = inject(LoaderService);
  userService = inject(UserService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users.set(this.userService.getAllUsers());
    this.filteredUsers.set(this.userService.getAllUsers());

  }

  onSearchChange(event: any) {
    this._loader.show();
    const val = event.target.value as string;
    this.searchTerm.set(val);
    if (val === '') {
      this.filteredUsers.set(this.users());
    } else {
      const filtered = this.users().filter(product =>
        product.name.toLowerCase().includes(val.toLowerCase())
      );
      this.filteredUsers.set(filtered);
    }
    this._loader.hide();
  }

  onDeleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id);
        this.loadUsers();
        this.showSuccess('Product Deleted Successfully');
      }
    });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



}
