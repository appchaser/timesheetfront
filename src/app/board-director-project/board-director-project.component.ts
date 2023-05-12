import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-board-director-project',
  templateUrl: './board-director-project.component.html',
  styleUrls: ['./board-director-project.component.css']
})
export class BoardDirectorProjectComponent implements OnInit {


  constructor(private usr:UserService) { }
  message="hey there...."
  ngOnInit(): void {

    this.usr.setmessage(this.message)
  }

}
