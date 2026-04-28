import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Footer component for the application.
 *
 * @remarks
 * This is a simple presentational component. It only shows the copyright text
 * requested in the statement and the developer information.
 *
 * @example
 * ```html
 * <app-footer/>
 * ```
 */
@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
