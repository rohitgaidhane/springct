import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  get getId() {
    return this.loginForm.controls['id'];
  }
  get getPass() {
    return this.loginForm.controls['pass'];
  }
  submit() {
    console.log(this.getId)
    const loginData = this.loginForm.value;
    if (loginData.id == 'Admin' && loginData.pass == 'Admin') {
      localStorage.setItem('role', 'ADMIN');
      this.router.navigate(['/productList']);
      alert('Login Success Role ADMIN');
    } else if (loginData.id == 'User' && loginData.pass == 'User') {
      localStorage.setItem('role', 'USER');
      this.router.navigate(['/home']);
      alert('Login Success Role USER');
    } else {
      alert('Incorrect Id , Pass');
    }
  }
}
