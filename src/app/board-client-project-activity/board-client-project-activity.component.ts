import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client-service.service';
import { ProjectService } from '../service/project-service.service';
import { ActivityService } from '../service/activity-service.service';
import {Client} from '../model/Client';
import {Project} from '../model/Project';
import {Activities} from '../model/Activities'
import { MatTableDataSource } from '@angular/material/table';
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
 // clients: any[];
  _clients: Client[] = [];
  clients = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'clientName', 'delete', 'update'];
  displayedColumns1: string[] = ['id', 'client','project_name','start_date','end_date', 'delete', 'update'];
  displayedColumns2:string[] = ['id', 'project','activity', 'delete', 'update'];

  _projects: Project[]=[];
  projects = new MatTableDataSource();
  _activities: Activities[]=[];
  activities = new MatTableDataSource();
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
      this.clients.data = result;
      this._clients = result;

    });



  }

  allProjects(){
    this.projectService.getAllProject().subscribe((result) => {
      this.projects.data = result;
      this._projects = result;

    });



  }

  allActivities(){
    this.activityService.getAllActivities().subscribe((result) => {
      this.activities.data= result;
      this._activities= result;
    });



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  applyFilterForProject(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projects.filter = filterValue.trim().toLowerCase();
  }

  applyFilterForActivity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activities.filter = filterValue.trim().toLowerCase();
  }

  addClient(){
    const { name } = this.clientform;
    this.clientService.addClient(name).subscribe(
      (res) => {
        const addedClient: Client = res;
      this.clients.data.push(addedClient);
      this.clients._updateChangeSubscription();
      },

      (err) => {

      }
    );
  }
  addProject(){
    const project = this.projectform;
    this.projectService.addProject(project).subscribe(
      (res) => {
        console.log(res);

        const addedProject: Project = res;

      // Update the project list
      this.projects.data.push(addedProject);

      // Optionally, you can clear the form after adding the project
      this.projectform = { name: '', description: '' };
        this.clientService.afectClientProject(this.selectedClient , res.id).subscribe(
          (result) => {
            console.log(result)
            this.projects._updateChangeSubscription();
          }
        )
      },
      (err) => {
      }
    );
  }

  addActivity(){
    const newActivity = this.activityform;
    this.activityService.addActivity(newActivity).subscribe(
      (res) => {
        console.log(res);
        const addedActivity: Activities = res;

        // Update the activity list or perform any other required actions
        this.activities.data.push(addedActivity);
          this.activities._updateChangeSubscription();

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
