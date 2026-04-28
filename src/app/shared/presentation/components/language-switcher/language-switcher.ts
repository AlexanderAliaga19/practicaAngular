import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

/**
 * Component used to switch the application language.
 *
 * @remarks
 * I keep this component separated because the language selection belongs to the
 * shared UI, not to the coding resources feature. It works with the languages
 * configured in the i18n files.
 *
 * @example
 * ```html
 * <app-language-switcher/>
 * ```
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  /** Current language selected in the application. */
  currentLang = 'en';

  /** Languages available in the toggle group. */
  languages = ['en', 'es'];

  /**
   * Creates the language switcher and reads the current language.
   *
   * @param translate - Service used to change the application language.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.getCurrentLang() || 'en';
  }

  /**
   * Changes the application language.
   *
   * @param language - Language code selected by the user.
   */
  useLanguage(language: string): void {
    this.currentLang = language;
    this.translate.use(language);
  }
}
