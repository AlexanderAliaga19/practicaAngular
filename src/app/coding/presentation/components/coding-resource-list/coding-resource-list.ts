import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { CodingResource } from '../../../domain/model/coding-resource.entity';
import { CodingResourceItem } from '../coding-resource-item/coding-resource-item';

/**
 * Component that renders the coding resources catalogue.
 *
 * @remarks
 * This component receives the resources from the layout and prints one card per
 * resource. It does not call the API directly because that responsibility stays
 * in the store and infrastructure layer.
 *
 * @example
 * ```html
 * <app-coding-resource-list [resources]="codingResources()"/>
 * ```
 */
@Component({
  selector: 'app-coding-resource-list',
  imports: [
    TranslatePipe,
    CodingResourceItem,
  ],
  templateUrl: './coding-resource-list.html',
  styleUrl: './coding-resource-list.css',
})
export class CodingResourceList {
  /** Coding resources displayed in the catalogue. */
  resources = input.required<Array<CodingResource>>();

  /** Indicates if the resources are still loading. */
  loading = input<boolean>(false);

  /** Error message shown when the API request fails. */
  error = input<string>('');
}
