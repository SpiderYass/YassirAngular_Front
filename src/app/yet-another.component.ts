import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-yet-another',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h2>Yet Another Component</h2>
    <p>This is yet another component.</p>
    <button mat-stroked-button color="accent">Accent Button</button>
  `,
  styles: [`
    h2 {
      color: green;
    }
  `]
})
export class YetAnotherComponent {}