import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommonResponse} from "../../models/response";
import {Observable} from "rxjs";
import {Identifiable} from "../../models/Identifiable";

@Injectable({
  providedIn: 'root'
})
export abstract class GenericControllerService<T extends Identifiable> {
  protected constructor(protected _http: HttpClient) { }

  protected abstract _endpointUrl: string;

  public getAllItems(): Observable<CommonResponse<T[]>> {
    return this._http.get<CommonResponse<T[]>>(`/api/${this._endpointUrl}/all`);
  }

  public getItem(id: string): Observable<CommonResponse<T>> {
    const params = new HttpParams().appendAll({ id: id });
    return this._http.get<CommonResponse<T>>(`/api/${this._endpointUrl}`, { params: params});
  }

  public addItem(item: T): Observable<CommonResponse<string>> {
    return this._http.post<CommonResponse<string>>(`/api/${this._endpointUrl}`, item);
  }

  public updateItem(item: T): Observable<CommonResponse<string>> {
    return this._http.put<CommonResponse<string>>(`/api/${this._endpointUrl}`, item);
  }

  public deleteItem(id: string): Observable<CommonResponse<string>> {
    const params = new HttpParams().appendAll({ id: id });
    return this._http.delete<CommonResponse<string>>(`/api/${this._endpointUrl}`, { params: params});
  }

}
