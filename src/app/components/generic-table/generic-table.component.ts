import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Identifiable} from "../../models/Identifiable";
import {GenericDataSource} from "../../models/generic-data-source";
import {ThemePalette} from "@angular/material/core";

export interface ColumnDefinition {
  defName: string;
  displayName: string;
  /** Name of property which value will be passed to
   * formatter or just displayed if formatter is not defined.
   */
  propertyName: string;
  /** Allows formatting field.
   * For example when you want to stringify user object so that
   * first and last name are displayed.
   */
  formatter?: (obj: any) => string;
}

export interface ActionDefinition {
  icon: string;
  /** Action which should be performed when button clicked */
  action: (item: Identifiable) => void;
  /** Rule which determines whether this action can be displayed or not.
   * If no function is set, action will be displayed */
  canDisplay?: () => boolean;
  color?: ThemePalette;
  tooltip?: string;
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T extends Identifiable> {
  protected _detailsUrl: string;
  protected _columnsDefinitions: ColumnDefinition[];
  protected _actionsDefinitions: ActionDefinition[];
  private _dataSource: GenericDataSource<T>;
  private _isLoading: boolean;
  private _readonly: boolean;

  @Output('itemDeleted')
  private _itemDeletedEmitter: EventEmitter<string>;

  @Output('itemEdit')
  private _itemEditEmitter: EventEmitter<T>;

  @Output('itemClick')
  private _itemClickEmitter: EventEmitter<T>;

  //#region Getters and setters
  get detailsUrl(): string {
    return this._detailsUrl;
  }

  get columnsToDisplay(): string[] {
    return this._columnsDefinitions
      .map(item => item.defName)
      .concat(this.actionsDefined ? 'actions' : '')
      .filter(col => !!col);
  }

  get columnsDefinitions(): ColumnDefinition[] {
    return this._columnsDefinitions;
  }

  get actionsDefinitions(): ActionDefinition[] {
    return this._actionsDefinitions;
  }

  get availableActions(): ActionDefinition[] {
    return this._actionsDefinitions.filter(action =>
      !action || !!action && action.canDisplay && action.canDisplay()
    );
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  @Input('readonly')
  set readonly(value: boolean) {
    this._readonly = value;
  }

  @Input('isLoading')
  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  @Input('dataSource')
  set dataSource(value: GenericDataSource<T>) {
    this._dataSource = value;
  }

  get dataSource(): GenericDataSource<T> {
    return this._dataSource;
  }
  //#endregion

  //#region Boolean calculated
  get actionsDefined(): boolean {
    return !!this.availableActions && this.availableActions.length > 0;
  }

  get anyItemExists(): boolean {
    return this.dataSource ? this.dataSource.data.value.length > 0 : false;
  }
  //#endregion

  constructor() {
    this._dataSource = new GenericDataSource<T>([]);
    this._itemDeletedEmitter = new EventEmitter<string>();
    this._itemEditEmitter = new EventEmitter<T>();
    this._itemClickEmitter = new EventEmitter<T>();
  }

  public emitItemClick(item: T): void {
    this._itemClickEmitter.emit(item);
  }

  public emitEdit(item: T): void {
    this._itemEditEmitter.emit(item);
  }

  public emitDelete(itemId: string): void {
    this._itemDeletedEmitter.emit(itemId);
  }
}
