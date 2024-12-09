import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentService } from '../shared/assignment.service';
import { AuthService } from '../shared/auth.service';
import { Observable, of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    RouterModule
  ],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !";
  ajoutActive = false;
  nomDevoir = '';
  dateDeRendu: Date | null = null;
  assignmentSelectionne: Assignment | null = null;
  formVisible: boolean = false;

  assignments: Assignment[] = [];

  // Pagination properties
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: boolean;
  prevPage!: boolean;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  constructor(
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignmentsPagine(this.page, this.limit);
  }

  getAssignmentsPagine(page: number, limit: number): void {
    this.assignmentService.getAssignments(page, limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log("Données reçues");
      }
    );
  }

  onSubmit(event: Event, form: any): void {
    event.preventDefault();
    const newAssignment: Assignment = {
      id: this.assignments.length + 1,
      nom: this.nomDevoir,
      dateDeRendu: this.dateDeRendu ? this.dateDeRendu.toISOString().split('T')[0] : '',
      rendu: false
    };
    this.assignmentService.addAssignment(newAssignment).subscribe(() => {
      this.assignments.push(newAssignment);
      form.resetForm();
    });
  }

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  refreshAssignments() {
    this.getAssignmentsPagine(this.page, this.limit);
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    console.log(`Updating assignment: ${assignment.nom}`);
    return of("Assignment modifié");
  }

  deleteAssignment(assignment: Assignment) {
    this.assignmentService.deleteAssignment(assignment.id).subscribe(() => {
      this.assignments = this.assignments.filter(a => a !== assignment);
      if (this.assignmentSelectionne === assignment) {
        this.assignmentSelectionne = null;
      }
      this.refreshAssignments(); // Refresh the list of assignments
    });
  }

  editAssignment(assignment: Assignment) {
    this.router.navigate(['/assignment', assignment.id, 'edit']); // Navigate to the EditAssignmentComponent
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  goToFirstPage() {
    this.page = 1;
    this.getAssignmentsPagine(this.page, this.limit);
  }

  goToPreviousPage() {
    if (this.hasPrevPage) {
      this.page--;
      this.getAssignmentsPagine(this.page, this.limit);
    }
  }

  goToNextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.getAssignmentsPagine(this.page, this.limit);
    }
  }

  goToLastPage() {
    this.page = this.totalPages;
    this.getAssignmentsPagine(this.page, this.limit);
  }
}