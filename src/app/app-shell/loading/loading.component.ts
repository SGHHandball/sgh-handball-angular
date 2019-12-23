import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TC_ROUTE_HOME} from "../../translation.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements  OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate([TC_ROUTE_HOME])
  }

}
