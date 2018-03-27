import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  start: string;
  end: string;
  city: string;

  constructor(public afa: AngularFireAuth, private router: Router) {}

  // This gets the information from the searchformdata in home.component.html
  onSubmit(searchformdata) {
    if (searchformdata.valid) {
      this.router.navigate(['/searchresults', searchformdata.value.cityname, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
    }
  }

  ngOnInit() {


  }

}
