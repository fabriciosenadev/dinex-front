import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {

  @Output() newLaunch: EventEmitter<any> = new EventEmitter();

  launchForm: FormGroup = new FormGroup({});
  
  constructor() { }

  ngOnInit(): void {
  }

  handleLaunchForm(): void {
    this.launchForm = new FormGroup({
      launchType: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      date: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      idCategory: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description: new FormControl(
        '',
        [],
      ),
      amount: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0.01),
        ],
      ),
      isConfirmed: new FormControl(
        '',
        [],
      ),
      isScheduled: new FormControl(
        '',
        [], 
      ),
    });
  }
  

}
