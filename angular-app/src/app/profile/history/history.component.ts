import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import { Reservation } from '../../booking/shared/reservation.model';
import { Hotel } from "../../models/hotel";
import { HotelInfo } from '../../services/hotel-info';
import { Booking } from '../../models/booking';
import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

<<<<<<< HEAD
  reservations: Reservation[];
  bookings: Booking[] = [];


  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
    this.pullReservations();
    this.userProfileService.getUserInfo();
  }

  public async pullReservations() {
    await this.userProfileService.getReservations();
    this.reservations = this.userProfileService.reservation;
    let numRes = this.reservations.length;

    for (let i = 0; i < numRes; i++) {
      var num = i.toString();
      var hotel = new Hotel();
      var booking = new Booking();

      const id_ref = firebase.database().ref('/hotel_id');
      var index;
      await id_ref.once('value').then((snapshot) => {
        const count = snapshot.numChildren();
        for (var i = 0; i < count; i++) {
          const number = i.toString();
          if (snapshot.child(number).val() == this.reservations[num].hotelID) {
            index = number;
            break;
          }
        }
      });
      await this.hotelInfo.getHotelData(index);
      hotel = this.hotelInfo.getHotel();
      booking.hotelName = hotel.name;
      booking.hotelLoc = hotel.location;
      booking.$key = this.reservations[num].$key;
      booking.checkInDt = this.reservations[num].checkInDt;
      booking.checkOutDt = this.reservations[num].checkOutDt;
      booking.comments = this.reservations[num].comments;
      booking.guests = this.reservations[num].guests;
      booking.rooms = this.reservations[num].rooms;
      this.bookings.push(booking);
    }
  }


=======
  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
  }

>>>>>>> 8a31394e5c629e466d5899d18d150bc14ee3e98e
}
