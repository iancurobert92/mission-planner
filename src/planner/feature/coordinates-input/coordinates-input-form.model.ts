import { FormControl } from '@angular/forms';

export interface CoordinatesInputForm {
  name: FormControl<string | null>;
  x: FormControl<string | null>;
  y: FormControl<string | null>;
}
