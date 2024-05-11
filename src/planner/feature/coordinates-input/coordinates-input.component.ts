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
import { PlannerService } from '@planner/data-access';

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
    name: this.fb.nonNullable.control('', Validators.required),
    x: this.fb.nonNullable.control(0, Validators.required),
    y: this.fb.nonNullable.control(0, Validators.required),
  });

  get formControls() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private plannerService: PlannerService
  ) {}

  onAddButtonClick() {
    if (!this.form.valid) return this.form.markAllAsTouched();
    this.plannerService.addCoordinate(this.form.getRawValue());
    this.form.reset();
  }
}
