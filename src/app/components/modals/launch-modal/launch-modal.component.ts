import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { launchStatus } from 'src/app/shared/models/launch/enums/launchStatusEnum';

export interface LaunchModal {
  id: number;
  date: string;
  categoryId: number;
  description: string;
  amount: number;
  status: launchStatus;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  applicable: string | null;
  categoryName: string;
  payMethod: string;
  isToDelete: boolean;
}

@Component({
  selector: 'app-launch-modal',
  templateUrl: './launch-modal.component.html',
  styleUrls: ['./launch-modal.component.css']
})
export class LaunchModalComponent extends SimpleModalComponent<LaunchModal, boolean> implements LaunchModal {

  id = 0;
  date = '';
  categoryId = 0;
  description = '';
  amount = 0;
  status = launchStatus.pending;
  userId = '';
  createdAt = '';
  updatedAt: string | null = '';
  deletedAt: string | null = '';
  applicable: string | null = '';
  categoryName = '';
  payMethod = '';
  isToDelete = false;

  constructor() {
    super();
  }

  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }

  updateStatus() {

  }
}
