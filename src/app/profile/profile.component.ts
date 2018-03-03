import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  amount = 0;
  baseUrl = 'https://mydana.herokuapp.com/api/';
  have_img: Boolean = false;

  constructor(private http:Http, private router:ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.user = [];
    let user_fund = [];
    let id = this.router.snapshot.params['id'];
    this.http.get(this.baseUrl + 'user/' +id ).map(res => res.json()).subscribe(items => {
      this.user = items.data;
      if(this.user.image == ""){
        this.have_img = false;
      }else{
        this.have_img = true;
      }
      user_fund = items.data.fund;
      user_fund.forEach(f => {
        this.amount = this.amount + f.amount;
      })
      console.log(this.user);
    })
  }

  logOut(){
    window.localStorage.clear();
    this.route.navigateByUrl('/');
  }

  homepage(){
    this.route.navigateByUrl('/')
  }

}
