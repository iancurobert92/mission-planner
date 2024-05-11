import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CoordinatesInputForm } from './coordinates-input-form.model';

@Component({
  selector: 'app-coordinates-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatError,
  ],
  templateUrl: './coordinates-input.component.html',
  styleUrl: './coordinates-input.component.scss',
})
export class CoordinatesInputComponent {
  form = this.fb.group<CoordinatesInputForm>({
    name: this.fb.control(null, Validators.required),
    x: this.fb.control(null, Validators.required),
    y: this.fb.control(null, Validators.required),
  });

  get formControls() {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  onAddButtonClick() {
    if (!this.form.valid) return this.form.markAllAsTouched();
  }
}
