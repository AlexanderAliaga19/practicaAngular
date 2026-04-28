/**
 * Resource representing the raw coding resource returned by the API.
 *
 * @remarks
 * This interface follows the structure returned by SampleAPIs. It stays in the
 * infrastructure layer because it represents the external API format, not the
 * domain model used by the app.
 */
export interface CodingResourceResource {
  /** Identifier of the coding resource. */
  id: number;

  /** Main description of the coding resource. */
  description: string;

  /** Website URL related to the resource. */
  url: string;

  /** List of resource types. */
  types: string[];

  /** List of topics covered by the resource. */
  topics: string[];

  /** List of suggested learning levels. */
  levels: string[];
}
