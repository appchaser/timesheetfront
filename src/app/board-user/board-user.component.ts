import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  message!:string
  @Output() event=new EventEmitter<string>()
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.message=this.userService.getmessage()
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  sendmessage(){
    this.event.emit(this.message)
  }


}
