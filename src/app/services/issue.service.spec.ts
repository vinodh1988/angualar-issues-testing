import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService]
    });
    service = TestBed.inject(IssueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all issues', () => {
    const mockIssues = [
      { id: 1, description: 'Issue 1', status: 'open' },
      { id: 2, description: 'Issue 2', status: 'closed' }
    ];

    service.getIssues().subscribe((issues) => {
      expect(issues.length).toBe(2);
      expect(issues).toEqual(mockIssues);
    });

    const req = httpMock.expectOne('http://localhost:4500/issues');
    expect(req.request.method).toBe('GET');
    req.flush(mockIssues);
  });

  it('should fetch issue by ID', () => {
    const mockIssue = { id: 1, description: 'Issue 1', status: 'open' };

    service.getIssueById(1).subscribe((issue) => {
      expect(issue).toEqual(mockIssue);
    });

    const req = httpMock.expectOne('http://localhost:4500/issues/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockIssue);
  });

  it('should create a new issue', () => {
    const newIssue = { description: 'New Issue', status: 'open' };

    service.createIssue(newIssue).subscribe((issue) => {
      expect(issue).toEqual({ id: 3, ...newIssue });
    });

    const req = httpMock.expectOne('http://localhost:4500/issues');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...newIssue });
  });

  it('should update an issue', () => {
    const updatedIssue = { id: 1, description: 'Updated Issue', status: 'closed' };

    service.updateIssue(updatedIssue).subscribe((issue) => {
      expect(issue).toEqual(updatedIssue);
    });

    const req = httpMock.expectOne('http://localhost:4500/issues/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedIssue);
  });

  it('should delete an issue', () => {
    service.deleteIssue(1).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('http://localhost:4500/issues/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
