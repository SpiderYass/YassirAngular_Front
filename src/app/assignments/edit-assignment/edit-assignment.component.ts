import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../../shared/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  queryParams: any;
  fragment: string | null = null;

  constructor(
    @Inject(AssignmentService) private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      console.log('Query Params:', params);
    });
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      console.log('Fragment:', fragment);
    });
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      if (assignment) {
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = new Date(assignment.dateDeRendu);
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment === '' || this.dateDeRendu === undefined) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu.toISOString().split('T')[0];
    this.assignmentService.updateAssignment(this.assignment).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}