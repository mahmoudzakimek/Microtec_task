import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNgModule } from '../../shared/modules/prime-ng/prime-ng.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

import { LoaderService } from '../../shared/services/loader.service';
import { UserService } from '../../shared/services/user.service';
import { BankList, IUser } from '../../shared/model/user';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
  providers: [MessageService],
})
export class ManageUsersComponent implements OnInit {
  userId!: string | null;
  form!: FormGroup;
  categories = signal<string[]>([]);
  user!: IUser;

  // #############
  _route = inject(ActivatedRoute);
  _fb = inject(FormBuilder);
  _router = inject(Router);
  userService = inject(UserService);
  messageService = inject(MessageService);
  _loader = inject(LoaderService);
  // ###############
  bankArray: FormArray = this._fb.array([]);
  private counter: number = 0;
  currencyList: { name: string, code: string }[] = [];
  permissionList: { name: string, role: string }[] = [];
  GlAcountList: { name: string, code: string }[] = [];


  ngOnInit(): void {
    this.initForm();
    this.userId = this._route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getuserById(this.userId);
    }

    this.currencyList = [
      { name: 'Dollar', code: 'NY' },
      { name: 'Egyption Pound', code: 'RM' },
      { name: 'euro', code: 'LDN' },
    ];
    this.GlAcountList = [
      { name: '1234', code: 'NY' },
      { name: '990099', code: 'RM' },
      { name: '220022', code: 'LDN' },
    ];


    this.permissionList = [
      { name: 'Admin', role: 'role' },
      { name: 'User', role: 'role' },
      { name: 'Accountant', role: 'role' },
    ];
  }


  getuserById(id: string) {
    this._loader.show();
    const users = this.userService.getUsersFromLocalStorage();
    this.user = users.find((user: IUser) => user.id === id);
    if (this.user) {
      this.form.patchValue(this.user);
      if (this.user.bankList) {
        this.bankArray.clear();
        this.user.bankList.forEach((bank: BankList) => {
          this.bankArray.push(this._fb.group(bank));
        });
      }
    } else {
      this.showError();
    }
    this._loader.hide();
  }

  createBankGroup(): FormGroup {
    return this._fb.group({
      id: [`${Date.now()}_${this.counter++}`],
      accountNumber: ['', Validators.required],
      glAccountCode: ['', Validators.required],
      glAcountName: ['', Validators.required],
      branchr: ['', Validators.required],
      iban: ['', Validators.required],
      currency: ['', Validators.required],
      currentBalance: ['', [Validators.required, Validators.min(0)]],
      userPermission: ['', Validators.required],
      openingBalance: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get bankControls(): FormArray {
    return this.bankArray as FormArray;
  }

  addBankRow() {
    return this.bankArray.push(this.createBankGroup());
  }

  removeBankRow(index: number) {
    this.bankArray.removeAt(index);
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: [
        ,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: [, Validators.compose([Validators.required])],
      startName: [, Validators.compose([Validators.required])],
      address: [
        ,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }

  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUser = {
      ...this.form.value,
      bankList: this.bankControls.value,
    };

    let users: IUser[] = this.userService.getUsersFromLocalStorage();

    if (this.userId) {
      const index = users.findIndex((user) => user.id === this.userId);
      if (index > -1) {
        users[index] = data;
        this.userService.updateLocalStorage(users);
        this.showSuccess('user updated successfully.');
      } else {
        this.showError();
      }
    } else {
      data.id = `${Date.now()}_${this.counter++}`;
      users.push(data);
      this.userService.updateLocalStorage(users);
      this.showSuccess('user added successfully.');
    }

    this._router.navigateByUrl('/users').then(() => {
      window.location.reload();
    });
  }

  discard() {
    this.form.reset();
    this.bankArray.reset();
    this._router.navigateByUrl('/users');
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

}
