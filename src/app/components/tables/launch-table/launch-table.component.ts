import { Component, Input, OnInit } from '@angular/core';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Launch } from 'src/app/shared/models/launch/launch.model';

@Component({
  selector: 'app-launch-table',
  templateUrl: './launch-table.component.html',
  styleUrls: ['./launch-table.component.css']
})
export class LaunchTableComponent implements OnInit {

  @Input() launches: Launch[] = [];

    //Icons
    faEye = faEye;
    faTrashCan = faTrashCan;

  constructor() { }

  ngOnInit(): void {    
  }

  viewLaunch(launchId: number) {
    console.log(this.launches);
  }

  deleteLaunch(launchId: number) {
    console.log(this.launches);
  }

}
