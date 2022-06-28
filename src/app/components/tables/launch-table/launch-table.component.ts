import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SimpleModalService } from 'ngx-simple-modal';
import { Category } from 'src/app/shared/models/category/category.model';
import { LaunchAndPayMethod } from 'src/app/shared/models/launch/launch-and-pay-method.model';
import { Launch } from 'src/app/shared/models/launch/launch.model';
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
  @Output() launchToView: EventEmitter<Launch> = new EventEmitter();
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

  private sendLaunchToModal(launch: Launch, payMethodName: string, categoryName: string) {  
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
      isToDelete: false
    }).subscribe(
      (isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          // alert('accepted');
        }
        else {
          // alert('declined');
        }
      });
  }

  getCategoryName(launch: Launch, payMethodName: string) {
    this.categoryService.get(launch.categoryId).subscribe(
      async (result: Category) => 
      {
        let categoryName = result.name;
        this.sendLaunchToModal(launch, payMethodName, categoryName);
      }
    );
  }

  getPayMethodName(launch: Launch) {
    this.launchService.get(launch.id).subscribe(
      async (result: LaunchAndPayMethod) => {
        let payMethod = result.payMethodFromLaunch?.payMethod ? result.payMethodFromLaunch?.payMethod : '';

        this.getCategoryName(launch, payMethod)
      }
    );
  }

  viewLaunch(launch: Launch) {
    // console.log(launch);
    this.getPayMethodName(launch);
    
    // this.launchToView.emit(launch);
  }

  deleteLaunch(launch: Launch) {
    console.log(launch);
    // this.launchToDelete.emit(launch);
  }

}
