import { Component, OnInit } from '@angular/core';
import {Field} from "../field/field.component";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  fields: Field[]
  name: string;
  constructor(name: string, fields: Field[]) {
    this.fields = fields;
    this.name = name;
  }

  ngOnInit() {
  }

}
