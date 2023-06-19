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
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { projetdt } from '../board-client/models/projetdt';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  clients1:Client[]
  durationInSeconds = 5
  projects1:Project[]
  activitiys:Activities[]
  user:User
  dataSource = new MatTableDataSource();
  clients = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'clientName', 'delete', 'update'];
  displayedColumns1: string[] = ['id', 'client','project_name','start_date','end_date', 'delete', 'update'];
  displayedColumns2:string[] = ['id', 'project','activity', 'delete', 'update'];
  displayedColumns3:string[]=['id','username','email','role']

  clientControl = new FormControl();
  clientOptions: Client[] = [];
  clientFilteredOptions  : Observable<any[]>;

  projectControl = new FormControl();
  projectOptions: projetdt[] = [];
  projectFilteredOptions: Observable<any>;

  userControl = new FormControl();
  useroptions: any[] = [];
  userfilteredOptions: Observable<any[]>;

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
  constructor(private clientService: ClientService ,private _snackBar: MatSnackBar,private userservice: UsersService, private projectService : ProjectService , private activityService : ActivityService) { }

  private _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.useroptions.filter(option => option.username.toLowerCase().includes(filterValue));
  }
  private _filterProject(value: string): projetdt[] {
    const filterValue = value.toLowerCase();
    return this.projectOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private _filterClient(value: string): Client[] {
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.clientOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  loadClients()
  {
    //
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 1855, // Duration in milliseconds
      horizontalPosition: 'center', // Position: 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // Position: 'top' | 'bottom'
      panelClass: 'custom-snack-bar'
    });
  }

  ngOnInit(): void {
    this.clientFilteredOptions = this.clientControl.valueChanges.pipe(
       startWith(''),
       map(value => typeof value === 'string' ? value : value.name),
       map(name => name ? this._filterClient(name) : this.clientOptions.slice())
    );
    this.userfilteredOptions = this.userControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.username),
       map(name => name ? this._filterUser(name) : this.useroptions.slice())
    );
    this.projectFilteredOptions = this.projectControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
       map(name => name ? this._filterProject(name) : this.projectOptions.slice())
    );
    this.allClients();
    this.allProjects();
    this.allActivities();
    this.getAll();
    this.userservice.getAllUsers().subscribe( (res:any[]) => {
      console.log(res)
      res.forEach( (u:any) => this.useroptions.push({id:u.id,username:u.username }));
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
    // this.clientFilteredOptions =   this.clientService.getAllClient();
    this.clientService.getAllClient().subscribe((result) => {
      this.clients.data = result;
      this._clients = result;
      this.clientOptions = result;
    });

  }

  deleteactivity(activity: Activities): void {
    if (activity.id){
    this.activityService.deleteActivity(activity.id).subscribe(() => {
     // this.dataSource.data = this.dataSource.data.filter((c: Client) => c.id !== client.id);
      this.activitiys = this.activitiys.filter(a =>
        a.id !== activity.id);
    this.dataSource.data = this.dataSource.data.filter(a => (a as Activities).id !== activity.id) as Activities[];
    },(error) => {
      console.log(error); // Log any error that occurs during the delete request
    });
  }}

  deleteproject(project: Project): void {
    if (project.id){
    this.projectService.deleteProject(project.id).subscribe(() => {
     // this.dataSource.data = this.dataSource.data.filter((c: Client) => c.id !== client.id);
      this.projects1 = this.projects1.filter(p =>
        p.id !== project.id);
    this.dataSource.data = this.dataSource.data.filter(p => (p as Project).id !== project.id) as User[];
    },(error) => {
      console.log(error); // Log any error that occurs during the delete request
    });
  }}

  deleteclient(client: Client): void {
    if (client.id){
    this.clientService.deleteClient(client.id).subscribe(() => {
     // this.dataSource.data = this.dataSource.data.filter((c: Client) => c.id !== client.id);
      this.clients1 = this.clients1.filter(c => c.id !== client.id);
    this.dataSource.data = this.dataSource.data.filter(c => (c as Client).id !== client.id) as Client[];
    },(error) => {
      console.log(error); // Log any error that occurs during the delete request
    });
  }}

  allProjects(){
    // this.projectFilteredOptions = this.projectService.getAllProject();
    this.projectService.getAllProject().subscribe((result) => {
      this.projects.data = result;
      this._projects = result;

    });
  }

projectss:any;
selectedClientId:any;
selectedProjectId:any;
displayFn(user: Client): string {
  return user && user.name ? user.name : '';
}

displayProject(p: Project): string {
  return p && p.name ? p.name : '';
}
displayUser(u: User): string {
  return u && u.username ? u.username : '';
}
  showProject(event : any){
    console.log(event.option.value)
   // this.projectFilteredOptions =  this.clientService.getClientById(this.selectedClientId);
     this.clientService.getClientById(event.option.value.id).subscribe(
      res => {
         this.projectss = res.projects;
         this.projectOptions = res.projects
         console.log(this.projectOptions)
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
