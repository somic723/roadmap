import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JiraApiService {
  constructor(private http: HttpClient) {}

  issuesUrl = 'assets/Frontend_project_sample_data.json';

  getIssues() {
    return this.http.get(this.issuesUrl);
  }
}
