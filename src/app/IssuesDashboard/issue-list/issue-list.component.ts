import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent {
  @Input() issues: any[] = [];
  @Output() editIssue = new EventEmitter<any>();
  @Output() deleteIssue = new EventEmitter<number>();
}
