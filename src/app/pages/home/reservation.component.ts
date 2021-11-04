import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Reservation} from "../../models/reservation";

@Component({
  selector: 'app-home',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  private _reservation: Reservation;

  constructor(router: Router) {
    this._reservation = router.getCurrentNavigation()?.extras?.state?.data;

    console.log(this._reservation);
  }
}
