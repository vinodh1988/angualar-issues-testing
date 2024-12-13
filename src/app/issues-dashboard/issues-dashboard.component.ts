import { Component, OnInit } from '@angular/core';
import { IssueService } from '../services/issue.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-issues-dashboard',
  templateUrl: './issues-dashboard.component.html',
  styleUrls: ['./issues-dashboard.component.css']
})
export class IssuesDashboardComponent implements OnInit {
  language:string="en"
  issues: any[] = [];
  selectedIssue: any = {description:"",status:""};

  constructor(private issueService: IssueService,private ts:TranslateService) {}

  ngOnInit(): void {
    this.loadIssues();
    this.ts.use(this.language);
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe(data => this.issues = data);
  }

  onEditIssue(issue: any): void {
    this.selectedIssue = issue;
  }

  onSaveIssue(issue: any): void {
    alert("triggered")
    console.log("issue")
    if (issue.id) {
      this.issueService.updateIssue(issue).subscribe(() => this.loadIssues());
    } else {
      this.issueService.createIssue(issue).subscribe(() => this.loadIssues());
    }
    this.selectedIssue ={description:"",status:""};
  }

  onDeleteIssue(id: number): void {
    this.issueService.deleteIssue(id).subscribe(() => this.loadIssues());
  }

  changeLanguage(){
    this.ts.use(this.language);
  }
}
