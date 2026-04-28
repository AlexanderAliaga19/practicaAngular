/**
 * @author: Alexander Auden Aliaga Ocampo
 * codigo:U202417693
 */


/**
 * Domain entity representing a coding resource.
 *
 * @remarks
 * This entity keeps the main information that the catalogue needs to show.
 * The data comes from the coding resources API, and the logo URL is added later
 * so the card can display an image for the resource website.
 *
 * @example
 * ```typescript
 * const resource = new CodingResource();
 * resource.description = 'MDN Web Docs';
 * ```
 */
export class CodingResource {
  /** Identifier assigned to the resource. */
  id: number;

  /** Main text used as the title of the card. */
  description: string;

  /** Website URL of the coding resource. */
  url: string;

  /** Resource types returned by the API. */
  types: string[];

  /** Topics related to this coding resource. */
  topics: string[];

  /** Suggested learning levels for the resource. */
  levels: string[];

  /** Logo URL generated from the resource website. */
  urlToLogo: string;

  /**
   * Creates a coding resource with safe default values.
   *
   * @remarks
   * I initialize the arrays as empty to avoid errors in the template when the
   * API returns incomplete data or when the view renders before the request ends.
   */
  constructor() {
    this.id = 0;
    this.description = '';
    this.url = '';
    this.types = [];
    this.topics = [];
    this.levels = [];
    this.urlToLogo = '';
  }
}
