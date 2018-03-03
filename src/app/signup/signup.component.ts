import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  baseUrl = 'https://mydana.herokuapp.com/api/';
  token;
  success:Boolean=false;
  error;

  constructor(private http: Http, private router:Router) { }

  ngOnInit() {
  }

  login(loginForm){
    let email = loginForm.value.email;
    let password = loginForm.value.password;

    let header = new Headers();
    header.append('Content-Type', 'application/json');

    new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'login', {email, password}, {headers : header}).subscribe(res => {
        let data = res.json();
        this.token = data.token;
        window.localStorage.setItem('token', this.token);
        resolve(data);
        resolve(res.json());
        resolve(this.router.navigateByUrl('/'))
      }, (err) => {
        this.error = err;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setTimeout(function () {
          this.error = null;
        }.bind(this), 3000);
        reject(err);
      })
    })

    loginForm.reset();
  }

  register(registerForm){
    let name = registerForm.value.name;
    let email = registerForm.value.email;
    let password = registerForm.value.password;

    let header = new Headers();
    header.append('Content-Type', 'application/json');

    this.http.post(this.baseUrl + 'register', {name:name, email:email, password:password}, {headers:header}).subscribe(res => {
      console.log(res.json());
      
    })

    registerForm.reset();
    this.success = !this.success;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(function () {
      this.success = false;
    }.bind(this), 3000);


  }

  homepage(){
    this.router.navigateByUrl('/')
  }

}
