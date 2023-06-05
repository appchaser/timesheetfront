import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client-service.service';
import { ProjectService } from '../service/project-service.service';
import { ActivityService } from '../service/activity-service.service';
import {Client} from '../model/Client';
import {Project} from '../model/Project';
import {Activities} from '../model/Activities'
import { User } from '../model/Users';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../_services/user.service';
import { UsersService } from '../service/user.service';
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
  users:User[]
  user:User
  dataSource = new MatTableDataSource();
  clients = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'clientName', 'delete', 'update'];
  displayedColumns1: string[] = ['id', 'client','project_name','start_date','end_date', 'delete', 'update'];
  displayedColumns2:string[] = ['id', 'project','activity', 'delete', 'update'];
  displayedColumns3:string[]=['id','username','email','role']


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
  listClient!: Client[]
  listPorjects!: Project[]
  constructor(private clientService: ClientService ,private userservice: UsersService, private projectService : ProjectService , private activityService : ActivityService) { }

  ngOnInit(): void {

    this.allClients();
    this.allProjects();
    this.allActivities();
    this.getAll();
    this.userservice.getAllUsers().subscribe( (res:any) => {
      let r : User[] = [] ;
      res.forEach((e:any) => {
        let roles = "";
        e.roles.forEach((role:any) => {roles +=  role.name + " " });
        r.push({
          ...e,
          role : roles
        })
      })
      this.dataSource.data = r;
    })
  }

  getAll() {
    this.clientService.getAllClient().subscribe(res => { this.listClient = res });
    this.projectService.getAllProject().subscribe(res => { this.listPorjects = res;console.log(res) });
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

projectss:any;
selectedClientId:any;
selectedProjectId:any;

  showProject(){
    console.log(this.selectedProjectId)
    this.clientService.getClientById(this.selectedClientId).subscribe(
      res => {
        this.projectss = res.projects;
      }
    )
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
  addActivity(){
    const newActivity = this.activityform;
    this.activityService.addActivity(newActivity).subscribe(
      (res) => {
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


  onChange(event: any) {


    this.selectedClient = event;
    console.log(this.selectedClient)

  }

  onChangeActivity(event: any) {


    this.selectedProject = event;
    console.log(this.selectedProject)

  }


}
