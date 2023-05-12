import { Component, OnInit } from '@angular/core';
import { Activities } from 'src/app/model/Activities';
import { Client } from 'src/app/model/Client';
import { Project } from 'src/app/model/Project';
import { TimeSheet } from 'src/app/model/timesheetModel';
import { ActivityService } from 'src/app/service/activity-service.service';
import { ClientService } from 'src/app/service/client-service.service';
import { DepartmentService } from 'src/app/service/department.service';
import { ProjectService } from 'src/app/service/project-service.service';
import { TimeSheetService } from 'src/app/service/time-sheet-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-showpage',
  templateUrl: './showpage.component.html',
  styleUrls: ['./showpage.component.css']
})
export class ShowpageComponent implements OnInit {
  listTimesheet!: TimeSheet[];
  isLoggedIn = false;
  sum: Number = 0;
  listActivites!: Activities[]
  listPorjects!: Project[]
  listClient!: Client[]
  timeSheet: TimeSheet = new TimeSheet();
  constructor(private departementService: DepartmentService, private tokenStorage: TokenStorageService, private projectService: ProjectService, private clientService: ClientService, private timesheetservice: TimeSheetService, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAll()
    this.sum = this.timeSheet.date1_hours + this.timeSheet.date2_hours + this.timeSheet.date3_hours + this.timeSheet.date4_hours + this.timeSheet.date5_hours + this.timeSheet.date6_hours + this.timeSheet.date7_hours
    console.log(this.listTimesheet)
  }
  getAll() {
    this.timesheetservice.getAllTimeSheets().subscribe(res => {
      this.listTimesheet = res;
    })
    this.activityService.getAllActivities().subscribe(res => { this.listActivites = res })
    this.clientService.getAllClient().subscribe(res => { this.listClient = res });
    this.projectService.getAllProject().subscribe(res => { this.listPorjects = res });

  }

  deleteTimeSheet() {
    this.timesheetservice.deleteTimeSheet(this.timeSheet).subscribe(rs => { console.log(rs) });
    this.reloadPage();
  }
  sendEmail() {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();

      this.departementService.sendEmail(user.departement).subscribe(res => { console.log(res) });


    }
  }

  update() {
    this.timesheetservice.updateTimeSheet(this.timeSheet).subscribe(res=>console.log(res))
    this.reloadPage();
  }
  change(event: Event) {
    this.sum = 0;
    this.timeSheet = new TimeSheet()
    this.getByid(Number((event.target as HTMLInputElement).value));
  }
  getByid(id: number) {
    this.timesheetservice.getbyId(id).subscribe(res => {
      this.timeSheet = res
    console.log(res)
      this.sum = Number(this.timeSheet.date1_hours) + Number(this.timeSheet.date2_hours) + Number(this.timeSheet.date3_hours) + Number(this.timeSheet.date4_hours) + Number(this.timeSheet.date5_hours) + Number(this.timeSheet.date6_hours) + Number(this.timeSheet.date7_hours)
    })
  }
  reloadPage(): void {
    window.location.reload();
  }

}
