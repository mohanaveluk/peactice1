import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.css']
})
export class ExampageComponent implements OnInit {

  screenWidth: number = 0;
  constructor() { }

  ngOnInit(): void {
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth =  event.target.innerWidth;
  }
}
