import { Component, input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';
import { User } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  membersFromHome = input.required<User[]>();

  @Output() cancelRegister = new EventEmitter<boolean>();

protected creds: RegisterCreds = {
  email: '',
  displayName: '',
  password: ''
};

  register() {
    console.log(this.creds);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}