import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFormComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit sendIssue when form is submitted', () => {
    spyOn(component.sendIssue, 'emit');

    // Set initial issue values
    component.issue = { description: 'New Issue', status: 'open' };
    fixture.detectChanges();

    // Simulate form submission
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    // Verify the emitted value
    expect(component.sendIssue.emit).toHaveBeenCalledWith({
      description: 'New Issue',
      status: 'open'
    });
  });
});
