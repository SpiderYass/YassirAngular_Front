import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AssignmentsComponent } from "./assignments/assignments.component";
import { AnotherComponent } from './another.component';
import { AuthService } from './shared/auth.service';
import { AssignmentService } from './shared/assignment.service'; // Import AssignmentService
import { Assignment } from './assignments/assignment.model'; // Import Assignment
import { bdInitialAssignments } from './shared/data'; // Import bdInitialAssignments
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSlideToggleModule,
    HttpClientModule, // Add HttpClientModule here
    AssignmentsComponent,
    AnotherComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  constructor(public authService: AuthService, private router: Router, private assignmentService: AssignmentService) {}

  login() {
    const username = 'admin'; // Replace with actual username
    const password = 'adminpassword'; // Replace with actual password
    this.authService.login(username, password);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = a.dateDeRendu;
      nouvelAssignment.rendu = a.rendu;

      this.assignmentService.addAssignment(nouvelAssignment)
        .subscribe(reponse => {
          console.log(reponse);
        });
    });
  }
}