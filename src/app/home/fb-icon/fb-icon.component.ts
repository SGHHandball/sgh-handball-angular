import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fb-icon',
  templateUrl: './fb-icon.component.html',
  styleUrls: ['./fb-icon.component.scss']
})
export class FbIconComponent implements OnInit {

  @Input() iconPath: string;
  @Input() link: string;

  constructor() {
  }

  ngOnInit() {
  }

  openLink() {
    window.open(this.link);
  }

}
