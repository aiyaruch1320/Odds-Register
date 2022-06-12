import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRes } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: UserRes[] = [];

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => (this.users = data));
  }
}
