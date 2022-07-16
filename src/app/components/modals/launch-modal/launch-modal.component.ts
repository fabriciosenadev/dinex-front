import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { LaunchModalAction } from 'src/app/shared/interfaces/launch/enums/launchModalActionEnum';
import { launchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import { LaunchModal } from 'src/app/shared/interfaces/launch/modal/launch-modal.interface';
import { ResultLaunchModal } from 'src/app/shared/interfaces/launch/modal/result-launch-modal.interface';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-launch-modal',
  templateUrl: './launch-modal.component.html',
  styleUrls: ['./launch-modal.component.css']
})
export class LaunchModalComponent extends SimpleModalComponent<LaunchModal, ResultLaunchModal> implements LaunchModal {

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

  constructor(private simpleModalService: SimpleModalService) {
    super();
  }

  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code

    this.simpleModalService.addModal(ConfirmModalComponent, {
      title: 'Aviso de exclusão',
      message: 'Deseja apagar este lançamento?'
    }).subscribe((isConfirmed) => {
      this.result = {
        action: LaunchModalAction.deleteLaunch,
        isToActing: isConfirmed
      };
      this.close();
    });

  }
  cancel() {
    this.result = {
      action: LaunchModalAction.none,
      isToActing: false
    };
    this.close();
  }

  updateStatus() {
    this.result = {
      action: LaunchModalAction.updateLaunch,
      isToActing: true
    };
    this.close();
  }
}
