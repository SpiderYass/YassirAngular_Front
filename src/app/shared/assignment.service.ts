import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { bdInitialAssignments } from './data'; // Import the generated data

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private HttpOptions = {
    headers: new HttpHeaders({ 
    'Content-Type': 'application/json' })
  };
  private apiUrl = 'http://localhost:8010/api/assignments';

  constructor(private http: HttpClient) { }

  getAssignments(page: number = 1, limit: number = 10): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log('Fetched assignments', data)),
      catchError(this.handleError<any>('getAssignments', []))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    };
  } 

  getAssignment(id: number): Observable<Assignment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Assignment>(url).pipe(
      tap(a => {
        console.log("tap: assignment avec id = " + id + " reaueté GET envoyé sur MongoDB cloud"); 
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment, this.HttpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    const url = `${this.apiUrl}/${assignment.id}`;
    return this.http.put(url, assignment, this.HttpOptions);
  }

  deleteAssignment(id: number): Observable<Assignment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Assignment>(url);
  }

  // Method to populate the database with 500 assignments
  peuplerBD(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk`, bdInitialAssignments, this.HttpOptions).pipe(
      tap(() => console.log('Database populated with 500 assignments')),
      catchError(this.handleError<any>('peuplerBD'))
    );
  }
}