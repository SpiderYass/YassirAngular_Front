import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../../shared/assignment.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignment!: Assignment | null;

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
      .subscribe((assignment) => this.assignment = assignment ?? null);
  }

  onAssignmentRendu() {
    if (this.assignment) {
      this.assignmentService.updateAssignment(this.assignment).subscribe(message => {
        console.log(message);
        this.assignmentService.getAssignment(this.assignment!.id).subscribe((updatedAssignment) => {
          this.assignment = updatedAssignment;
        });
      });
    }
  }

  onDelete() {
    if (this.assignment) {
      this.assignmentService.deleteAssignment(this.assignment.id).subscribe((message: any) => {
        console.log(message);
        this.router.navigate(['/home']); // Navigate back to the AssignmentsComponent
      });
    }
  }

  onClickEdit() {
    if (this.assignment) {
      this.router.navigate(['/assignment', this.assignment.id, 'edit']);
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}