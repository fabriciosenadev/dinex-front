import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SimpleModalService } from 'ngx-simple-modal';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchModalAction } from 'src/app/shared/interfaces/launch/enums/launchModalActionEnum';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
import { ResultLaunchModal } from 'src/app/shared/interfaces/launch/modal/result-launch-modal.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { LaunchModalComponent } from '../../modals/launch-modal/launch-modal.component';

@Component({
  selector: 'app-launch-table',
  templateUrl: './launch-table.component.html',
  styleUrls: ['./launch-table.component.css']
})
export class LaunchTableComponent implements OnInit {

  @Input() launches: Launch[] = [];
  @Output() updateStatusLaunch: EventEmitter<Launch> = new EventEmitter();
  @Output() launchToDelete: EventEmitter<Launch> = new EventEmitter();

  //Icons
  faEye = faEye;
  faTrashCan = faTrashCan;

  constructor(
    private simpleModalService: SimpleModalService,
    private categoryService: CategoryService,
    private launchService: LaunchService
  ) { }

  ngOnInit(): void {
  }

  private sendLaunchDataToModal(
    launch: Launch,
    payMethodName: string,
    categoryName: string,
    isToDelete: boolean
  ) {
    this.simpleModalService.addModal(LaunchModalComponent, {
      id: launch.id,
      date: launch.date,
      categoryId: launch.categoryId,
      description: launch.description,
      amount: launch.amount,
      status: launch.status,
      userId: launch.userId,
      createdAt: launch.createdAt,
      updatedAt: launch.updatedAt,
      deletedAt: launch.deletedAt,
      applicable: launch.applicable,
      categoryName: categoryName,
      payMethod: payMethodName,
      isToDelete: isToDelete
    }).subscribe(
      (result: ResultLaunchModal) => {      
        switch (result.action) {
          case LaunchModalAction.deleteLaunch:
            if (result.isToActing)
              this.launchToDelete.emit(launch);
            break;
          case LaunchModalAction.updateLaunch:
              this.updateStatusLaunch.emit(launch);
            break;
          default:
            break;
        }
      });
  }

  getCategoryName(launch: Launch, payMethodName: string, isToDelete: boolean) {
    this.categoryService.get(launch.categoryId).subscribe(
      async (result: Category) => {
        let categoryName = result.name;
        this.sendLaunchDataToModal(launch, payMethodName, categoryName, isToDelete);
      }
    );
  }

  getPayMethodName(launch: Launch, isToDelete: boolean) {
    if(launch?.id)
    this.launchService.get(launch?.id).subscribe(
      async (result: LaunchAndPayMethod) => {
        let payMethod = result.payMethodFromLaunch?.payMethod ? result.payMethodFromLaunch?.payMethod : '';

        this.getCategoryName(launch, payMethod, isToDelete)
      }
    );
  }

  viewLaunch(launch: Launch, isToDelete: boolean) {
    this.getPayMethodName(launch, isToDelete);
  }
}
