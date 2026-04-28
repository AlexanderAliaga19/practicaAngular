/**
 * @author: Alexander Auden Aliaga Ocampo
 * codigo:U202417693
 */

import { AfterViewInit, Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { Footer } from '../footer/footer';
import { CodingResourcesStore } from '../../../../coding/application/coding-resources.store';
import { CodingResourceList } from '../../../../coding/presentation/components/coding-resource-list/coding-resource-list';

/**
 * Main layout component for the application.
 *
 * @remarks
 * This component works as the main screen shell. It loads the coding resources
 * from the store and passes them to the catalogue list. I keep the API loading
 * here so the list and item components stay focused only on presentation.
 *
 * @example
 * ```html
 * <app-layout/>
 * ```
 */
@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    TranslatePipe,
    LanguageSwitcher,
    Footer,
    CodingResourceList,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements AfterViewInit {
  /** Application store for the coding resources catalogue. */
  protected store = inject(CodingResourcesStore);

  /** Resources loaded from the store and displayed in the catalogue. */
  protected readonly codingResources = this.store.codingResources;

  /** Loading state used by the catalogue view. */
  protected readonly loading = this.store.loading;

  /** Error message returned by the store if the API request fails. */
  protected readonly error = this.store.error;

  /**
   * Loads the catalogue once the layout view is ready.
   *
   * @remarks
   * The store already checks if resources were loaded before, so calling this
   * method here is safe.
   */
  ngAfterViewInit(): void {
    this.store.loadCodingResources();
  }
}
