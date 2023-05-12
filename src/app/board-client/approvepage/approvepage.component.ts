import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';
import { Activities } from 'src/app/model/Activities';
import { Client } from 'src/app/model/Client';
import { Project } from 'src/app/model/Project';
import { TimeSheet } from 'src/app/model/timesheetModel';
import { User } from 'src/app/model/Users';
import { ActivityService } from 'src/app/service/activity-service.service';
import { ClientService } from 'src/app/service/client-service.service';
import { DepartmentService } from 'src/app/service/department.service';
import { ProjectService } from 'src/app/service/project-service.service';
import { TimeSheetService } from 'src/app/service/time-sheet-service.service';
import { UsersService } from 'src/app/service/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-approvepage',
  templateUrl: './approvepage.component.html',
  styleUrls: ['./approvepage.component.css']
})
export class ApprovepageComponent implements OnInit {
  timeSheet: TimeSheet = new TimeSheet();
  listTimesheet!: TimeSheet[];
  listUsers!: User[];
  sum: number = 0;

  listActivites!: Activities[]
  listPorjects!: Project[]
  listClient!: Client[]
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private userService: UsersService, private tokenStorage: TokenStorageService, private projectService: ProjectService, private clientService: ClientService, private timesheetservice: TimeSheetService, private activityService: ActivityService) { }
  ngOnInit(): void {
    this.getAll()

  }
 change(event: Event) {
    this.sum = 0;
    this.timeSheet = new TimeSheet()
    this.getByid(Number((event.target as HTMLInputElement).value));
  }
  getByid(id: number) {
    this.timesheetservice.getbyId(id).subscribe(res => {
      this.timeSheet = res

      this.sum = Number(this.timeSheet.date1_hours) + Number(this.timeSheet.date2_hours) + Number(this.timeSheet.date3_hours) + Number(this.timeSheet.date4_hours) + Number(this.timeSheet.date5_hours) + Number(this.timeSheet.date6_hours) + Number(this.timeSheet.date7_hours)
    })


  }
  getAll() {
    this.timesheetservice.getAllTimeSheets().subscribe(res => {
      this.listTimesheet = res;
    })
    this.activityService.getAllActivities().subscribe(res => { this.listActivites = res })
    this.clientService.getAllClient().subscribe(res => { this.listClient = res });
    this.projectService.getAllProject().subscribe(res => { this.listPorjects = res });
    this.userService.getAllUsers().subscribe((res:any) => { this.listUsers = res })
  }
  submit() {

  }

}
