import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SymptomsService} from "../../services/symptoms.service";

@Component({
  selector: 'app-create-diagnose',
  templateUrl: './create-diagnose.component.html',
  styleUrls: ['./create-diagnose.component.scss']
})
export class CreateDiagnoseComponent implements OnInit {
  constructor(private _dialog: MatDialogRef<CreateDiagnoseComponent>,
              private _symptomsService: SymptomsService) { }

  ngOnInit(): void {  }
}
