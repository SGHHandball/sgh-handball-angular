import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "../../abstract/abstract.component";
import {Router} from "@angular/router";
import {TranslationService} from "../../translation.service";
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends AbstractComponent {

  handset : boolean;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              public translationService: TranslationService,
              public adminService: AdminService) {
    super(breakpointObserver);
    this.isHandset$.subscribe(handset=>{
      this.handset = handset;
    })
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  closeSideNavOnHandheldMode(drawer){
    if (this.handset){
      drawer.close();
    }
  }

}
