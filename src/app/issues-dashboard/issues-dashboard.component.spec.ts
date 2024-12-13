import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IssuesDashboardComponent } from './issues-dashboard.component';
import { IssueService } from '../services/issue.service';
import { IssueListComponent } from '../IssuesDashboard/issue-list/issue-list.component';
import { IssueFormComponent } from '../IssuesDashboard/issue-form/issue-form.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IssuesDashboardComponent', () => {
  let component: IssuesDashboardComponent;
  let fixture: ComponentFixture<IssuesDashboardComponent>;
  let issueServiceSpy: jasmine.SpyObj<IssueService>;

  const mockIssues = [
    { id: 1, description: 'Issue 1', status: 'open' },
    { id: 2, description: 'Issue 2', status: 'closed' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IssueService', [
      'getIssues',
      'updateIssue',
      'createIssue',
      'deleteIssue'
    ]);

    TestBed.configureTestingModule({
      declarations: [IssuesDashboardComponent,IssueListComponent,IssueFormComponent],
      imports:[ 
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatButtonModule,
        HttpClientModule],
      providers: [{ provide: IssueService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesDashboardComponent);
    component = fixture.componentInstance;
    issueServiceSpy = TestBed.inject(IssueService) as jasmine.SpyObj<IssueService>;

    issueServiceSpy.getIssues.and.returnValue(of(mockIssues));
    fixture.detectChanges();
  });

  it('should load issues on initialization', () => {
    expect(component.issues).toEqual(mockIssues);
    expect(issueServiceSpy.getIssues).toHaveBeenCalled();
  });

  it('should call updateIssue when saving an existing issue', () => {
    const updatedIssue = { id: 1, description: 'Updated Issue', status: 'open' };
    issueServiceSpy.updateIssue.and.returnValue(of(updatedIssue));

    component.onSaveIssue(updatedIssue);

    expect(issueServiceSpy.updateIssue).toHaveBeenCalledWith(updatedIssue);
  });

  it('should call createIssue when saving a new issue', () => {
    const newIssue = { description: 'New Issue', status: 'open' };
    issueServiceSpy.createIssue.and.returnValue(of({ id: 3, ...newIssue }));

    component.onSaveIssue(newIssue);

    expect(issueServiceSpy.createIssue).toHaveBeenCalledWith(newIssue);
  });

  it('should delete an issue', () => {
    issueServiceSpy.deleteIssue.and.returnValue(of({}));

    component.onDeleteIssue(1);

    expect(issueServiceSpy.deleteIssue).toHaveBeenCalledWith(1);
  });
});
