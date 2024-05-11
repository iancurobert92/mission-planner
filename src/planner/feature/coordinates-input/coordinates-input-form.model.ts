import { FormControl } from '@angular/forms';

export interface CoordinatesInputForm {
  name: FormControl<string | null>;
  x: FormControl<string | null>;
  y: FormControl<string | null>;
}

export interface CoordinatesInputValue {
  name: string | null;
  x: string | null;
  y: string | null;
}
