import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Seanse} from "../../models/seanse";
import {Reservation} from "../../models/reservation";
import {ReservationsService} from "../../services/reservations.service";
import {filter, map, takeUntil, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {forkJoin, interval, Subject} from "rxjs";
import {DateTransformations} from "../../helpers/date-transformations";

@Component({
  selector: 'app-home',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {
  private _seanse: Seanse;
  private _reservations: Reservation[];
  private _destroyed = new Subject();

  constructor(router: Router,
              private _reservationsService: ReservationsService,
              private _authService: AuthService) {
    this._seanse = router.getCurrentNavigation()?.extras?.state?.data;
  }

  // region Getters
  get user(): User | undefined {
    return this._authService.user;
  }

  get seanse(): Seanse {
    return this._seanse;
  }

  get seatsReservedPermanently(): number[] {
    return this._reservations
      ? this._reservations.filter(res => res.isPermanent).map(res => res.seatNumber)
      : [];
  }

  get seatsReservedTemporarly(): number[] {
    return this._reservations
      ? this._reservations.filter(res => !res.isPermanent && res.userId != this.user!.id).map(res => res.seatNumber)
      : [];
  }

  /**
   * Return seats reserved temporarly by user
   */
  get seatsReservedByUserFromBackend(): number[] {
    return this._reservations
      ? this._reservations.filter(res => !res.isPermanent && res.userId === this.user!.id).map(res => res.seatNumber)
      : [];
  }

  get allSeatsReservedByUser(): number[] {
    return this.seatsReservedByUserFromBackend;
  }
  // endregion

  ngOnInit() {
    this.getReservations();
    this.startReservationQueryInterval()
  }

  private getReservations(): void {
    const seanseId = this._seanse.id;
    this._reservationsService.getAllReservationsBySeanse(seanseId).pipe(
      filter(res => !!res),
      map(reservations => reservations!.filter(
        res => res.isPermanent
          || (!res.isPermanent && DateTransformations.getSecondsFromDate(res.startTime) < 60)
      )),
      tap(reservations => {
        this._reservations = [];
        this._reservations.push(...reservations!);
      })
    ).subscribe();
  }

  private startReservationQueryInterval(): void {
    interval(1000).pipe(
      takeUntil(this._destroyed),
      tap(() => this.getReservations())
    ).subscribe()
  }

  public toggleSeatFromReservation(seatNumber: number): void {
    const allBackendReservations = [...this.seatsReservedByUserFromBackend, ...this.seatsReservedTemporarly, ...this.seatsReservedPermanently];
    if (!allBackendReservations.includes(seatNumber)) {
      this.addTemporaryReservation(seatNumber);
    } else if (this.seatsReservedByUserFromBackend.includes(seatNumber)) {
      const reservation = this._reservations.find(res => res.seatNumber === seatNumber);
      if (reservation != null) this.removeTemporaryReservation(reservation);
    }
  }

  private addTemporaryReservation(seatNumber: number): void {
    const reservation = new Reservation('00000000-0000-0000-0000-000000000000', this.user!.id, this._seanse.id, seatNumber);
    this._reservationsService.addItem(reservation).pipe(
      tap(() => {
        this.getReservations();
      })
    ).subscribe()
  }

  private removeTemporaryReservation(reservation: Reservation): void {
    this._reservationsService.deleteItem(reservation.id!).pipe(
      tap(() => {
        this._reservations = this._reservations.filter(res => res.seatNumber != reservation.seatNumber);
        this.getReservations();
      })
    ).subscribe()
  }

  public confirmReservations(): void {
    const reservations = this.createUserReservationsObjects();
    const restCalls = reservations.map(reservation => {
      // New item is created to prevent premature seat state change, `isPermanent` property would be changed;
      const resToUpdate = new Reservation(reservation.id, this.user!.id, this.seanse.id, reservation.seatNumber, new Date(), true);
      return this._reservationsService.updateItem(resToUpdate);
    })
    forkJoin(restCalls).pipe(
      tap(() => this.getReservations())
    ).subscribe();
  }

  private createUserReservationsObjects(): Reservation[] {
    const distinctSeatsToSave = [...new Set(this.seatsReservedByUserFromBackend)];
    return this._reservations.filter(res => distinctSeatsToSave.includes(res.seatNumber));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
