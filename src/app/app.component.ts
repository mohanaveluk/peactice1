import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  userId = "";
  title = 'My page title - 2';


  displayname(){
    this.userId = "90";
    console.log(this.userId);
  }

}
