import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInformation } from './team-information';

describe('TeamInformation', () => {
  let component: TeamInformation;
  let fixture: ComponentFixture<TeamInformation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInformation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
