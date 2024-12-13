import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueListComponent } from './issue-list.component';
import { MatListModule } from '@angular/material/list';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueListComponent],
      imports:[MatListModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    component.issues = [
      { id: 1, description: 'Issue 1', status: 'open' },
      { id: 2, description: 'Issue 2', status: 'closed' }
    ];
    fixture.detectChanges();
  });

  it('should emit editIssue when edit button is clicked', () => {
    spyOn(component.editIssue, 'emit');
    const button = fixture.nativeElement.querySelector('button[color="primary"]');
    button.click();

    expect(component.editIssue.emit).toHaveBeenCalledWith(component.issues[0]);
  });

  it('should emit deleteIssue when delete button is clicked', () => {
    spyOn(component.deleteIssue, 'emit');
    const button = fixture.nativeElement.querySelector('button[color="warn"]');
    button.click();

    expect(component.deleteIssue.emit).toHaveBeenCalledWith(component.issues[1].id);
  });
});
