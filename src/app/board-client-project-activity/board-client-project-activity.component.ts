import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client-service.service';
import { ProjectService } from '../service/project-service.service';
import { ActivityService } from '../service/activity-service.service';


interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-board-client-project-activity',
  templateUrl: './board-client-project-activity.component.html',
  styleUrls: ['./board-client-project-activity.component.css']
})
export class BoardClientProjectActivityComponent implements OnInit {
  clients: any[];
  projects: any[];
  activities: any[];
  selectedClient: any;
  selectedProject: any;

  clientform: any = {
    name: null
  };
  projectform: any = {

    name: null,
    startDate: null,
    endDate: null
  }

  activityform: any = {

    shortName: null
  }
  errorMessage = '';

  constructor(private clientService: ClientService , private projectService : ProjectService , private activityService : ActivityService) { }

  ngOnInit(): void {

    this.allClients();
    this.allProjects();
    this.allActivities();


  }






   allClients(){
    this.clientService.getAllClient().subscribe((result) => {
      this.clients = result;
      console.log(this.clients)

    });



  }

  allProjects(){
    this.projectService.getAllProject().subscribe((result) => {
      this.projects = result;
      console.log(this.projects)

    });



  }

  allActivities(){
    this.activityService.getAllActivities().subscribe((result) => {
      this.activities = result;
      console.log(this.activities)


    });



  }



  addClient(){
    const { name } = this.clientform;
    this.clientService.addClient(name).subscribe(
      (res) => {


      },
      (err) => {


      }
    );
  }

  addProject(){
    let project = this.projectform;

    this.projectService.addProject(project).subscribe(
      (res) => {

        console.log(res);

        this.clientService.afectClientProject(this.selectedClient , res.id).subscribe(
          (result) => {
            console.log(result)
          }
        )


      },
      (err) => {


      }
    );






  }

  addActivity(){
    let activity = this.activityform;

    this.activityService.addActivity(activity).subscribe(
      (res) => {

        console.log(res);

        this.projectService.afectProjectActivity(this.selectedProject , res.id).subscribe(
          (result) => {
            console.log(result)
          }
        )


      },
      (err) => {


      }
    );






  }

  onChange(event: any) {


    this.selectedClient = event;
    console.log(this.selectedClient)

  }

  onChangeActivity(event: any) {


    this.selectedProject = event;
    console.log(this.selectedProject)

  }


}
