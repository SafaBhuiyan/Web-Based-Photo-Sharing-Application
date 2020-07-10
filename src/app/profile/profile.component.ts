import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  userId: String;
user: User;

  constructor(private userService: UserService,   private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.loadUserProfile(this.userId);
    });

   
  }

  loadUserProfile(userId){
    this.userService.getUserProfile(userId)
    .subscribe(
                  response => this.user = <User>response,
                  err => console.error('User got an error: ' + err),
                () => console.log('User got a complete notification')
    );
    
  }

}
