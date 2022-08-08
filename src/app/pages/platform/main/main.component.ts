import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
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
export class MainComponent extends Notifications implements OnInit {

  //icons
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  userFirstName: string = '';

  date: Date = new Date();

  year: number = 0;

  loadingGrid = true;

  amountAvailable = 0;

  arrayLaunchResumeByYearAndMonth: LaunchResumeByYearAndMonth[] = []

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private router: Router,
    private headerService: HeaderService,
    private userService: UserService,
    private launchService: LaunchService,
    public override notify: NotificationService,
  ) {
    super(notify)
  }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = HeaderOptionsEnum.app;
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
        let message = 'Error ao obter usuario';
        this.handleError({ message });
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

  openSelectedMonthDetailPage(selectedMonthDetailPage: string): void {
    this.router.navigate([`app/launching/${selectedMonthDetailPage}`]);
  }

  getUserAmount(): void {
    this.userService.getUserAmountAvailable().subscribe(
      (result) => {
        this.amountAvailable = result.amountAvailable;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
}
