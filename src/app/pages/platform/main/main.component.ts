import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { LaunchResumeByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-resume-by-year-and-month.interface';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //icons
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  userFirstName: string = '';

  date: Date = new Date();

  year: number = 0;

  loadingGrid = true;

  arrayLaunchResumeByYearAndMonth: LaunchResumeByYearAndMonth[] = []

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private notify: NotificationService,
    private router: Router,
    private headerService: HeaderService,
    private userService: UserService,
    private launchService: LaunchService,
  ) { }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = headerOptionsEnum.app;
    setTimeout(() => {
      this.getUser();
    }, 100);

    this.year = this.date.getFullYear();
    this.getMonths();
  }

  getUser(): void {
    this.userService.get().subscribe(
      (user) => {
        this.userFirstName = user.fullName.split(' ')[0];
      },
      (err) => {
        console.log(err);
        let title = 'Error';
        let message = 'Error ao obter usuario';
        this.notify.error(title, message);
      }
    );
  }

  decreaseYear(): void {
    this.year--;
    this.getMonths();
  }

  increaseYear(): void {
    this.year++;
    this.getMonths();
  }

  getMonths(): void {
    let firstMonth = 1;
    let lastMonth = 12;

    this.loadingGrid = true;
    if (this.arrayLaunchResumeByYearAndMonth.length > 0)
      this.arrayLaunchResumeByYearAndMonth = [];

    for (let month = firstMonth; month <= lastMonth; month++) {

      this.launchService.getResumeByYearAndMonth(this.year, month).subscribe(
        async (result) => {
          await this.arrayLaunchResumeByYearAndMonth.push(result);
        },
        (error) => {
          console.log(error);

        },
        () => {
          this.loadingGrid = false;
        }
      );
        
    }
  }
}
