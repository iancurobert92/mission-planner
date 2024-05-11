import { FormControl } from '@angular/forms';

export interface CoordinatesInputForm {
  name: FormControl<string>;
  x: FormControl<number>;
  y: FormControl<number>;
}
