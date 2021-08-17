import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { listContacts } from './listContacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  msg: string = "";
  loginFlag: boolean = true;
  registerFlag: boolean = false;
  portfolioFlag: boolean = false;
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  password: string = "";
  contactArray: Array<listContacts> = [];

  login(loginRef: NgForm)
  {
    let newLogin = loginRef.value;
    if (newLogin.userName === this.userName && newLogin.userName != "" && newLogin.password === this.password)
    {
      this.hide("3");
    }
    else
    {
      this.msg = "Incorrect, please try again!";
    }
  }

  register(registerRef: NgForm)
  {
    let newRegister = registerRef.value;
    
    this.firstName = newRegister.firstName;
    this.lastName = newRegister.lastName;
    this.userName = newRegister.userName;
    this.password = newRegister.password;

    this.hide("2");
  }

  hide(page: string) 
  {
    switch (page)
    {
      case "1":
        this.registerFlag = true;
        this.loginFlag = false;
        break;
      case "2":
        this.registerFlag = false;
        this.loginFlag = true;
        break;
      case "3":
        this.loginFlag = false;
        this.portfolioFlag = true;
        break;
    }
  }
  
  store(portfolioRef: NgForm)
  {
    let contact = portfolioRef.value;
    let newContact: listContacts = new listContacts(contact.contactName, contact.contactPhone);
    this.contactArray.push(newContact);
    portfolioRef.reset();
  }
}