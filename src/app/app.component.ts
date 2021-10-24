import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  userId = "";
  title = 'My page title - 2';


  arrayObject = [34, 56, 65, 22, 99];
  userids: any = [];
  selectedArray: number = 0;
  selectedItem: string = '';

  editSelectedIndex: number = -1;
  editSelectedItem: string = '';
  editSelectedItemTemp: string = '';

  userAction: number = 0;

  constructor(
    private router: Router
  ){}

  displayname(){
    this.userId = "90";
    console.log(this.userId);
  }

  // Add = 1, Edit = 2, Delete = 3

  setArrayValue(){
    this.selectedItem = '';
    this.editSelectedItem = '';
    //this.selectedArray = this.arrayObject[2];

    if(this.editSelectedIndex >= 0){
      this.userids[this.editSelectedIndex] = this.userId;
      this.selectedItem = this.editSelectedItemTemp;
    }
    else{
      this.userids.push(this.userId);
    }
    this.selectedArray = this.userids.length;
    this.userId = '';
    this.editSelectedIndex = -1;
  }



  editItem(item: number){
    this.selectedItem = '';
    this.userAction = 2;
    this.editSelectedItemTemp = this.userids[item];
    this.editSelectedIndex = item;
    this.userId = this.userids[item];

  }

  removeItem(item: number){
    this.selectedItem = '';
    this.userAction = 3;

    console.log(item);
    this.selectedItem = this.userids[item];
    this.userids.splice(item, 1);

  }

  logout(){
    sessionStorage.removeItem("appToken");
    this.router.navigate(['/login']);
  }

}
