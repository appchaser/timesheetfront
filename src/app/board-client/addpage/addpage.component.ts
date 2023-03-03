import { Component, HostListener, OnInit,Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { Activities } from 'src/app/model/Activities';
import { Client } from 'src/app/model/Client';
import { Project } from 'src/app/model/Project';
import { TimeSheet } from 'src/app/model/timesheetModel';
import { ActivityService } from 'src/app/service/activity-service.service';
import { ClientService } from 'src/app/service/client-service.service';
import { ProjectService } from 'src/app/service/project-service.service';
import { TimeSheetService } from 'src/app/service/time-sheet-service.service';



import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year
      : '';
  }
}


@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent implements OnInit {
  timeSheet = new TimeSheet()
  timeSheetForm!: FormGroup;
  listActivites!: Activities[]
  model:any;
  listPorjects!: Project[]
  listClient!: Client[]
  mondaySum: number = 0;
  tuesdaySum: number = 0;
  wensdaySum: number = 0;
  thursdaySum: number = 0;
  fridaySum: number = 0;
  saturdaySum: number = 0;
  sundaySum: number = 0;
  isDisabled = false;
  sum: number = 0;
  dataArray: TimeSheet[] = [];
  constructor(  private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>, private projectService: ProjectService, private clientService: ClientService, private timesheetservice: TimeSheetService, private activityService: ActivityService) {

  }
  changeDate(){
    const date: Date = new Date(this.model['year'],this.model['month'],this.model['day']);

    console.log(date)
  }

  ngOnInit(): void {
    this.getAll()
    const date: Date = new Date(this.model['year'],this.model['month'],this.model['day']);
    this.timeSheet.date1_day = date;
    this.timeSheet.date1_hours = 0;

    this.timeSheet.date2_day = new Date(date.setDate(date.getDay() + 1));
    this.timeSheet.date2_hours = 0;
    this.timeSheet.date3_day = new Date(date.setDate(date.getDay() + 2));
    this.timeSheet.date3_hours = 0;

    this.timeSheet.date4_day = new Date(date.setDate(date.getDay() + 3));
    this.timeSheet.date4_hours = 0;

    this.timeSheet.date5_hours = 0;

    this.timeSheet.date5_day = new Date(date.setDate(date.getDay() + 4));
    this.timeSheet.date6_hours = 0;
    this.timeSheet.date7_hours = 0;


    this.timeSheet.date6_day = new Date(date.setDate(date.getDate() + 5));
    this.timeSheet.date7_day = new Date(date.setDate(date.getDate() + 6));

    this.dataArray.push(this.timeSheet)
  }
  save() {
    this.dataArray.forEach(element => {
      this.timesheetservice.addTimeSheet(element).subscribe(x => { console.log(x) })
    })
  }
  getAll() {
    this.activityService.getAllActivities().subscribe(res => { this.listActivites = res })
    this.clientService.getAllClient().subscribe(res => { this.listClient = res });
    this.projectService.getAllProject().subscribe(res => { this.listPorjects = res });

  }
  add() {
    var summ = 0;
    this.timeSheet = new TimeSheet();
    const date: Date = new Date(this.model['year'],this.model['month'],this.model['day']);
    console.log(this.model)
    console.log("here")
    this.timeSheet.date1_day = date;
    this.timeSheet.date1_hours = 0;
    console.log(this.timeSheet.date1_day)
    this.timeSheet.date2_day = new Date(date.setDate(date.getDate() + 1));
    this.timeSheet.date2_hours = 0;
    this.timeSheet.date3_day = new Date(date.setDate(date.getDate() + 2));
    this.timeSheet.date3_hours = 0;

    this.timeSheet.date4_day = new Date(date.setDate(date.getDate() + 3));
    this.timeSheet.date4_hours = 0;

    this.timeSheet.date5_hours = 0;

    this.timeSheet.date5_day = new Date(date.setDate(date.getDate() + 4));
    this.timeSheet.date6_hours = 0;
    this.timeSheet.date7_hours = 0;


    this.timeSheet.date6_day = new Date(date.setDate(date.getDate() + 5));
    this.timeSheet.date7_day = new Date(date.setDate(date.getDate() + 6));
    console.log(this.timeSheet.date7_day)
    this.dataArray.push(this.timeSheet)

  }
  reset() {
    this.dataArray = [];
    this.saturdaySum = 0;
    this.sundaySum = 0;
    this.mondaySum = 0;
    this.tuesdaySum = 0;
    this.wensdaySum = 0;
    this.thursdaySum = 0;
    this.fridaySum = 0;


    this.check()

  }

  changeValueMonday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date1_hours);
    })
    this.check()

    this.mondaySum = summ;
  }

  changeValueTuesday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date2_hours);
    })
    this.check()

    this.tuesdaySum = summ;
  }
  changeValueWensday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date3_hours);
    })
    this.check()

    this.wensdaySum = summ;
  }
  changeValueThursday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date4_hours);
    })
    this.check()

    this.thursdaySum = summ;
  }
  changeValueFriday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date5_hours);
    })
    this.check()

    this.fridaySum = summ;
  }
  changeValueSaturday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date6_hours);
    })
    this.check()

    this.saturdaySum = summ;
    this.check()
  }
  changeValueSunday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date7_hours);
    })
    this.check();
    this.sundaySum = summ;
  }
  check() {
    let summ = this.fridaySum + this.mondaySum + this.thursdaySum + this.wensdaySum + this.tuesdaySum;
    if (summ > 39) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
  @HostListener('window:keydown', ['$event'])
  sumEl(){
    this.dataArray.forEach(element=>{
      element.sum=  Number(element.date1_hours) + Number(element.date2_hours) + Number(element.date3_hours) + Number(element.date4_hours) + Number(element.date5_hours) + Number(element.date6_hours) + Number(element.date7_hours)

    })
  }
}
