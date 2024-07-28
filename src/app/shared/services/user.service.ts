import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private LOCAL_STORAGE_KEY = 'userList';
  userList: any = this.getUsersFromLocalStorage();
  url: string = environment.apiUrl;
  _http = inject(HttpClient);

  public getAllUsers() {
    return this.userList
  }

  public deleteUser(id: number): void {
    this.userList = this.userList.filter((user: any) => user.id !== id);
    this.updateLocalStorage(this.userList);
  }

  public getUsersFromLocalStorage(): any[] {
    const storedUsers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public updateLocalStorage(users: any[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));
  }

  public addUser(newUser: any): void {
    this.userList.push(newUser);
    this.updateLocalStorage(this.userList);
  }
}
