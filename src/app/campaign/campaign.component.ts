import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  token;
  logged : Boolean;
  baseUrl = 'https://mydana.herokuapp.com/api/';
  user;
  campaign_id;
  campaign;
  data;
  oview : Boolean = true;
  cment: Boolean = false;
  rcent: Boolean = false;
  success : Boolean = false;
  can : Boolean = false;
  have_img:Boolean = false;

  constructor(private http: Http, private router:Router, private route: ActivatedRoute) { 
    this.user = [];
    this.campaign_id = this.route.snapshot.params['id'];
    this.token = window.localStorage.getItem('token');
    if(this.token != null){
      this.can = true;
      this.logged = true;
      let header = new Headers();
      header.append('Authorization', 'Bearer ' + this.token)
      new Promise((resolve, reject) => {
        this.http.get(this.baseUrl + 'users', {headers : header}).map(res => res.json()).subscribe(data => {
          this.user = data.data;
          if(this.user.image == ""){
            this.have_img = false;
          }else{
            this.have_img = true;
          }
          resolve(data.data);
        }, (err) => {
          reject(err)
        });
      })
    }else{
      this.logged = false;
    }
  }

  ngOnInit() {
    this.campaign = [];
    this.http.get(this.baseUrl + 'campaign/' +this.campaign_id).map(res => res.json()).subscribe(data => {
      this.campaign = data.data;
      let calc;
      var oneDay = 24*60*60*1000;

      var first = new Date();
      var sec = new Date(this.campaign.campaign_end_date);
      calc = (this.campaign.fund_amount / this.campaign.total_amount) * 100;
      this.campaign.percent = Math.round(calc);
      this.campaign.days = Math.round(Math.abs((sec.getTime() - first.getTime()) / (oneDay)));
      this.campaign.mystyle = {'width' : `${this.campaign.percent}%`};
      this.campaign.campaign_comments.forEach(element => {
        element.RelativeDate = moment(element.created_at.date).fromNow();
      })

      console.log(this.campaign);
    })
    
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  logOut(){
    this.user = null;
    this.logged = false;
    window.localStorage.removeItem('token');
  }

  comment(){
    this.oview = false;
    this.cment = true;
    this.rcent = false;
  }

  overview(){
    this.oview = true;
    this.cment = false;
    this.rcent = false;
  }

  terkini(){
    this.oview = false;
    this.cment = false;
    this.rcent = true;
  }

  newComment(commentForm){
    let newc = commentForm.value.newcomment;
    console.log(newc);
    
    let cid = this.campaign_id;
    let uid = this.user.user_id;
    console.log(uid);
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    

    this.http.post(this.baseUrl + 'campaign/' + cid + '/campaigncomment', {desc:newc,campaign_id:cid,user_id:uid}, {headers:header}).subscribe(res => {
      console.log(res.json())
    })
  }

  profile(id){
    this.router.navigateByUrl('/profile/'+id)
  }

  homepage(){
    this.router.navigateByUrl('/')
  }

  donate(){
    this.router.navigateByUrl('/donate/'+this.campaign_id);
  }

}
