import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SimpleModalService } from 'ngx-simple-modal';
import { Category } from 'src/app/shared/models/category/category.model';
import { Launch } from 'src/app/shared/models/launch/launch.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { TestModalComponent } from '../../test-modal/test-modal.component';

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
  ) { }

  ngOnInit(): void {
  }

  viewLaunch(launch: Launch) {
    console.log(launch);
    // this.launchToView.emit(launch);
    // let disposable = 
    let categoryName = '';
    this.categoryService.get(launch.categoryId).subscribe(
      (result: Category) => {

        this.simpleModalService.addModal(TestModalComponent, {
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
          categoryName: result.name
        })
          .subscribe((isConfirmed) => {
            //We get modal result
            if (isConfirmed) {
              // alert('accepted');
            }
            else {
              // alert('declined');
            }
          });

      },
      (error: any) => {
        console.error(error)
      }
    );


    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);

  }

  deleteLaunch(launch: Launch) {
    console.log(launch);
    // this.launchToDelete.emit(launch);
  }

}
