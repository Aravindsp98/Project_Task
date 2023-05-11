import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
})
export class AdminAuthComponent implements OnInit {
  showLogin=false;
  authError:String='';
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.reloadSeller()
  }
  signUp(data: signUp): void {
    console.warn(data);
    this.admin.userSignUp(data);

  }
  
  login(data: signUp): void {
    this.admin.userLogin(data);
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
}
