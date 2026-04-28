import { Component, inject, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';

import { CodingResource } from '../../../domain/model/coding-resource.entity';

/**
 * Component that renders a single coding resource card.
 *
 * @remarks
 * The card shows the logo, description and extra information from the API.
 * It also includes the two required actions: opening the resource website and
 * sharing the resource with the browser share feature or clipboard fallback.
 *
 * @example
 * ```html
 * <app-coding-resource-item [resource]="resource"/>
 * ```
 */
@Component({
  selector: 'app-coding-resource-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatIconButton,
    MatIcon,
    TranslatePipe,
  ],
  templateUrl: './coding-resource-item.html',
  styleUrl: './coding-resource-item.css',
})
export class CodingResourceItem {
  /** Material snackbar used to show short feedback after sharing. */
  private snackBar = inject(MatSnackBar);

  /** Coding resource displayed by this card. */
  resource = input.required<CodingResource>();

  /**
   * Shares the current resource using browser share or clipboard.
   *
   * @remarks
   * Some desktop browsers do not support navigator.share, so I keep the
   * clipboard option as the fallback required by the statement.
   */
  async shareResource(): Promise<void> {
    const resourceShareInfo = {
      title: this.resource().description,
      url: this.resource().url,
    };

    if (navigator.share) {
      try {
        await navigator.share(resourceShareInfo);
        this.snackBar.open('Resource shared successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Sharing failed.', 'Close', { duration: 3000 });
      }
    } else {
      try {
        await navigator.clipboard.writeText(resourceShareInfo.url);
        this.snackBar.open('Resource URL copied to clipboard!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Failed to copy URL.', 'Close', { duration: 3000 });
      }
    }
  }
}
