import { Injectable } from '@angular/core';

/**
 * Shared infrastructure service for building website logo URLs.
 *
 * @remarks
 * This service builds a logo image from the website URL of each coding resource.
 * I use the website domain to get its favicon, so the catalogue can show a
 * related visual without saving logos manually in the project.
 *
 * @example
 * ```typescript
 * const logoUrl = this.logoApi.getUrlToLogo('https://developer.mozilla.org');
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LogoDevApi {
  /**
   * Builds a logo URL from a website URL.
   *
   * @param domain - Website URL used to extract the hostname.
   * @returns A favicon URL that can be used in an img tag.
   */
  getUrlToLogo(domain: string): string {
    try {
      const hostname = new URL(domain).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch {
      return 'images/women-who-code-logo.png';
    }
  }
}
