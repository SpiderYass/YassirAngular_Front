import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-another',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h2>Another Component</h2>
    <p>This is another component.</p>
    <button mat-stroked-button color="primary">Primary Button</button>
  `,
  styles: [`
    h2 {
      color: blue;
    }
  `]
})
export class AnotherComponent {}