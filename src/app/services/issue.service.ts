import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:4500/issues';

  constructor(private http: HttpClient) {}

  getIssues(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getIssueById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: any): Observable<any> {
    return this.http.post(this.apiUrl, issue);
  }

  updateIssue(issue: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${issue.id}`, issue);
  }

  deleteIssue(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
