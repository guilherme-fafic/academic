import { Component, OnInit } from '@angular/core';
import {ConfigurableInput} from '../../../../libs/dynamic-forms/models/configurable-input';
import {FormControl} from '@angular/forms';
import {UserProfile} from '../../../../global-models/user/UserProfile';
import {BackendService} from '../../../../global-services/backend/backend.service';

@Component({
  selector: 'app-professor-selector',
  templateUrl: './professor-selector.component.html',
  styleUrls: ['./professor-selector.component.css']
})
export class ProfessorSelectorComponent implements OnInit, ConfigurableInput {

  formControl = new FormControl('');
  professors;
  args;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.backend.getAll('users').then(data => {
      this.professors = data.filter(v => v.type === UserProfile.PROFESSOR);
      this.applyArguments(this.args);
    });

  }

  applyArguments(args) {

    this.args = args;

    if (args.defaultValue && this.professors){
      this.formControl.setValue(this.professors.find(v => v._id === args.defaultValue.id));
    }

  }

  getFormControl() {
    return this.formControl;
  }



}