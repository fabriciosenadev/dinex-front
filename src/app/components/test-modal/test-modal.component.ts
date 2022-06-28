import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { launchStatus } from 'src/app/shared/models/launch/enums/launchStatusEnum';
import { Launch } from 'src/app/shared/models/launch/launch.model';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.css']
})
export class TestModalComponent extends SimpleModalComponent<Launch, boolean> implements Launch  {

  id: number = 0;
  date: string = '';
  categoryId: number = 0;
  description: string = '';
  amount: number = 0;
  status: launchStatus = launchStatus.pending;
  userId: string = '';
  createdAt: string = '';
  updatedAt: string | null = null;
  deletedAt: string | null = null;
  applicable: string | null = null;
  categoryName: string | null = '';

  constructor() {
    super();
  }

  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }

  updateStatus(){
    
  }

}
