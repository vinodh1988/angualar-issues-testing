import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent {
  @Input("selectedIssue") issue: any = { description: '', status: 'open' };
  @Output() sendIssue = new EventEmitter<any>();

  saveIssue(): void {
    this.sendIssue.emit(this.issue);
    this.issue = { description: '', status: 'open' };
  }
}
