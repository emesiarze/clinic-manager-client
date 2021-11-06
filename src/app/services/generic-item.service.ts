import {Injectable} from '@angular/core';
import {GenericControllerService} from "./controllers/generic-controller.service";
import {SnackBarService} from "./snack-bar.service";
import {Observable, of} from "rxjs";
import {CommonResponse} from "../models/response";
import {catchError, map} from "rxjs/operators";
import {Identifiable} from "../models/Identifiable";

enum Action {
  Add = 'Dodano',
  Delete = 'Usunieto',
  Update = 'Zaktualizowano'
}

@Injectable({
  providedIn: 'root'
})
export class GenericItemService<T extends Identifiable> {
  constructor(protected controller: GenericControllerService<T>, protected snackBarService: SnackBarService) { }

  public getAllItems(): Observable<T[] | null> {
    return this.controller.getAllItems().pipe(
      map((result: CommonResponse<T[]>) => {
        const data = result.data;
        !result.isSuccess ? this.handleResponseFailed(result.errorMessage) : {};
        return data;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      }),
    );
  }

  public getItem(id: string): Observable<T | null> {
    return this.controller.getItem(id).pipe(
      map((result: CommonResponse<T>) => {
        const data = result.data;
        !result.isSuccess ? this.handleResponseFailed(result.errorMessage) : {};
        return data;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      })
    );
  }

  public addItem(item: T): Observable<boolean | null> {
    return this.controller.addItem(item).pipe(
      map((result: CommonResponse<string>) => {
        result.isSuccess ? this.handleActionSuccess(Action.Add) : this.handleResponseFailed(result.errorMessage)
        return result.isSuccess;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      })
    );
  }

  public updateItem(item: T): Observable<boolean | null> {
    return this.controller.updateItem(item).pipe(
      map((result: CommonResponse<string>) => {
        result.isSuccess ? this.handleActionSuccess(Action.Update) : this.handleResponseFailed(result.errorMessage);
        return result.isSuccess;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      })
    );
  }

  public deleteItem(id: string): Observable<boolean | null> {
    return this.controller.deleteItem(id).pipe(
      map((result: CommonResponse<string>) => {
        result.isSuccess ? this.handleActionSuccess(Action.Delete) : this.handleResponseFailed(result.errorMessage);
        return result.isSuccess;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      })
    );
  }

  protected handleActionSuccess(action: Action): void {
    this.snackBarService.openSuccessSnackBar(`${action.toString()} element`);
  }

  protected handleResponseFailed(error: string): void {
    this.snackBarService.openErrorSnackBar('Podczas przetwarzania zapytania wystąpił błąd');
    console.error(error);
  }

  protected handleDefaultError(error: string): void {
    this.snackBarService.openErrorSnackBar('Wystąpił błąd', error);
  }
}
