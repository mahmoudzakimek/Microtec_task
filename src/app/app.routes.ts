import { Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ManageUsersComponent, } from './components/manage-user/manage-users.component';

export const routes: Routes = [

    {
        path: 'users', component: ListUsersComponent
    },
    {
        path: 'manage-user', component: ManageUsersComponent
    },
    {
        path: 'manage-user/:id', component: ManageUsersComponent
    },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: '**', redirectTo: '/users' }

];
