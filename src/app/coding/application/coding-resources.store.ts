/**
 * @author: Alexander Auden Aliaga Ocampo
 * codigo:U202417693
 */

import { computed, inject, Injectable, signal } from '@angular/core';

import { CodingResource } from '../domain/model/coding-resource.entity';
import { CodingResourcesApi } from '../infrastructure/coding-resources-api';

/**
 * Application store for the Coding bounded context.
 *
 * @remarks
 * This store keeps the catalogue state using Angular Signals. The component
 * layer does not call the API directly; it asks the store to load the resources,
 * and the store coordinates with the infrastructure gateway.
 *
 * @example
 * ```typescript
 * protected store = inject(CodingResourcesStore);
 * protected readonly resources = this.store.codingResources;
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CodingResourcesStore {
  /** Internal signal with the loaded coding resources. */
  private codingResourcesSignal = signal<CodingResource[]>([]);

  /** Internal signal used to show loading state if needed. */
  private loadingSignal = signal<boolean>(false);

  /** Internal signal used to keep a simple error message. */
  private errorSignal = signal<string>('');

  /** Infrastructure gateway used to retrieve coding resources. */
  private codingResourcesApi = inject(CodingResourcesApi);

  /**
   * Read-only projection of the coding resources list.
   *
   * @remarks
   * Presentation components consume this signal to render the catalogue.
   */
  readonly codingResources = computed(() => this.codingResourcesSignal());

  /**
   * Read-only projection of the loading state.
   */
  readonly loading = computed(() => this.loadingSignal());

  /**
   * Read-only projection of the current loading error.
   */
  readonly error = computed(() => this.errorSignal());

  /**
   * Loads coding resources once from the API.
   *
   * @remarks
   * I added a small cache check so the app does not repeat the same request
   * every time the layout or list is rendered again.
   */
  loadCodingResources(): void {
    if (this.codingResourcesSignal().length > 0) return;

    this.loadingSignal.set(true);
    this.errorSignal.set('');

    this.codingResourcesApi.getCodingResources().subscribe({
      next: resources => {
        this.codingResourcesSignal.set(resources);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('Could not load coding resources.');
        this.loadingSignal.set(false);
      },
    });
  }
}
