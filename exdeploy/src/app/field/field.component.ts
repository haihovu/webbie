import { Component, OnInit } from '@angular/core';

export class Field {
  name: string;
  value: any;
  label: string;
  tooltip: string;
  type: string;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  field: Field;
  constructor(field: Field) {
    this.field = field;
  }

  ngOnInit() {
  }
}
