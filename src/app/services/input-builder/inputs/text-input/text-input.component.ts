import {Component, OnInit} from '@angular/core';
import {DynamicInput} from '../../DynamicInput';
import {FormControl} from '@angular/forms';
import {InputDescriptor} from '../../InputDescriptor';

@Component({
  selector: 'app-text-input',
  template: `
    <mat-form-field [class]="args.styleClass">
      <mat-label>{{args.label}}</mat-label>
      <input matInput [type]="args.type" [formControl]="formControl">
    </mat-form-field>
  `
})
export class TextInputComponent implements OnInit, DynamicInput {

  formControl = new FormControl('');
  args: InputDescriptor;

  constructor() {
  }

  ngOnInit(): void {
  }

  applyArguments(args) {
    this.args = args;
    if (args.defaultValue) {
      this.formControl.setValue(args.defaultValue);
    }
  }

  getFormControl() {
    return this.formControl;
  }

}
