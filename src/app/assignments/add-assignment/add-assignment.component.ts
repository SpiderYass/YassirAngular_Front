import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router'; // Import Router
import { Assignment } from '../assignment.model'; // Import the Assignment model
import { AssignmentService } from '../../shared/assignment.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDuDevoir: string = '';
  dateDeRendu: Date = new Date();

  constructor(private assignmentService: AssignmentService, private router: Router) { } // Inject Router

  ngOnInit(): void { }

  onSubmit() {
    const newAssignment: Assignment = {
      id: Math.floor(Math.random() * 1000), // Generate a random id
      nom: this.nomDuDevoir,
      dateDeRendu: this.dateDeRendu.toISOString().split('T')[0], // Convert Date to string
      rendu: false,
    };

    this.assignmentService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']); // Navigate back to the AssignmentsComponent
    });
    this.nomDuDevoir = '';
    this.dateDeRendu = new Date();
  }
}