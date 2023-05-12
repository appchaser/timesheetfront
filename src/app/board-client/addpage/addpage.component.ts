import { Component, HostListener, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
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
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
  @ViewChild("mondayInput") mondayInput: ElementRef<HTMLInputElement>;
  @ViewChild("tuesdayInput") tuesdayInput: ElementRef<HTMLInputElement>;
  @ViewChild("wednesdayInput") wednesdayInput: ElementRef<HTMLInputElement>;
  @ViewChild("thursdayInput") thursdayInput: ElementRef<HTMLInputElement>;
  @ViewChild("fridayInput") fridayInput: ElementRef<HTMLInputElement>;
  @ViewChild("saturdayInput") saturdayInput: ElementRef<HTMLInputElement>;
  @ViewChild("sundayInput") sundayInput: ElementRef<HTMLInputElement>;
  timeSheet = new TimeSheet()
  timeSheetForm!: FormGroup;
  listActivites!: Activities[]
  model: any;
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
  Disable= false;
  sum: number = 0;
  project!: any;
  dataArray: TimeSheet[] = [];
  summ = 0 ;
  constructor(private ngbCalendar: NgbCalendar, private tokenstorage: TokenStorageService,
    private dateAdapter: NgbDateAdapter<string>, private projectService: ProjectService, private clientService: ClientService, private timesheetservice: TimeSheetService, private activityService: ActivityService) {

  }
  changeDate() {
    const date: Date = new Date(this.model.year, this.model.month - 1, this.model.day);

    console.log(date)
  }

  ngOnInit(): void {
    this.getAll()

  }
  changeValueMonday(val : number) {
    if(val < 0 || val > 8){
      alert("value must be between 0 and 8.")
      this.mondayInput.nativeElement.value = "0" ;
      this.tuesdayInput.nativeElement.value="0"
      this.wednesdayInput.nativeElement.value="0"
      this.thursdayInput.nativeElement.value="0"
      this.fridayInput.nativeElement.value="0"
      this.saturdayInput.nativeElement.value="0"
      this.sundayInput.nativeElement.value="0"
    }
    this.summ += val;
    if (this.summ > 40) {
      this.Disable = true;
    } else {
      this.Disable = false;
    }
  //  this.check()
  }
  // selectedClient:any
  // onAddClient(client:any){

  // }
  userId:any
  save() {
    console.log(this.timeSheet)
    this.dataArray.forEach(element => {
      this.userId = this.tokenstorage.getUser().id;

      this.timesheetservice.addTimeSheet(element, this.selectedProjectId, this.userId, this.selectedActivityId, this.selectedClientId).subscribe(x => {
       
       })
    })
  }
  getAll() {
    this.activityService.getAllActivities().subscribe(res => { this.listActivites = res })
    this.clientService.getAllClient().subscribe(res => { this.listClient = res });
    this.projectService.getAllProject().subscribe(res => { this.listPorjects = res;console.log(res) });

  }
  add() {
    this.getAll()
    var summ = 0;
    this.timeSheet = new TimeSheet();

    const date: Date = new Date(this.model.year, this.model.month - 1, this.model.day);
    const date2: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 1);
    const date3: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 2);
    const date4: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 3);
    const date5: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 4);
    const date6: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 5);
    const date7: Date = new Date(this.model.year, this.model.month - 1, this.model.day + 6);

    console.log(this.model)

    this.timeSheet.date1_day = date;
    this.timeSheet.date1_hours = 0;
    console.log(this.timeSheet.date1_day)

    this.timeSheet.date2_day = date2;
    this.timeSheet.date2_hours = 0;
    this.timeSheet.date3_day = date3;
    this.timeSheet.date3_hours = 0;

    this.timeSheet.date4_day = date4;
    this.timeSheet.date4_hours = 0;

    this.timeSheet.date5_hours = 0;

    this.timeSheet.date5_day = date5;
    this.timeSheet.date6_hours = 0;
    this.timeSheet.date7_hours = 0;


    this.timeSheet.date6_day = date6;
    this.timeSheet.date7_day = date7;
    console.log(this.timeSheet.date7_day)
    console.log(this.timeSheet.date1_day)

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

  }

  changeValueTuesday() {
    var summ = 0;
    this.dataArray.forEach(element => {
      summ += Number(element.date2_hours);
    })
   // this.check()

    this.tuesdaySum = summ;
  }

  @HostListener('window:keydown', ['$event'])
  sumEl() {
    this.dataArray.forEach(element => {
      element.sum = Number(element.date1_hours) + Number(element.date2_hours) + Number(element.date3_hours) + Number(element.date4_hours) + Number(element.date5_hours) + Number(element.date6_hours) + Number(element.date7_hours)

    })
  }
  reloadPage(): void {
    window.location.reload();
  }

  projects:any;
  activity:any;
  selectedProjectId: any;
  selectedActivityId:any;
  selectedClientId:any;
  showProject(){
    console.log(this.selectedProjectId)
    this.clientService.getClientById(this.selectedClientId).subscribe(

      res => {
        this.projects = res.projects;
      }
    )
  }

  validate(val : number){


  }

  showActivity(){
    console.log(this.selectedActivityId)

    this.projectService.getProjectById(this.selectedProjectId).subscribe(
      res => {
        console.log(res.activity);
        this.activity = res.activity;
      }
    )
  }

}
