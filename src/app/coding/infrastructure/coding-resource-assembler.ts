import { LogoDevApi } from '../../shared/infrastructure/logo-dev-api';
import { CodingResource } from '../domain/model/coding-resource.entity';
import { CodingResourceResource } from './coding-resource-response';

/**
 * Assembler for transforming coding resource API data into domain entities.
 *
 * @remarks
 * This class separates the external API shape from the domain entity used by
 * the application. I use it so the rest of the app works with CodingResource
 * instead of depending directly on the API response.
 *
 * @example
 * ```typescript
 * const resources = CodingResourceAssembler
 *   .withLogoApi(logoApi)
 *   .toEntitiesFromResponse(response);
 * ```
 */
export class CodingResourceAssembler {
  /** Static dependency used to generate website logos. */
  static logoApi: LogoDevApi;

  /**
   * Sets the logo API used by the assembler.
   *
   * @param logoApi - Shared service used to build logo URLs.
   * @returns The assembler itself to keep the same chained style used in the project.
   */
  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  /**
   * Converts one raw API resource into a CodingResource entity.
   *
   * @param resource - Raw resource returned by the API.
   * @returns A CodingResource entity ready to be used by the app.
   */
  static toEntityFromResource(resource: CodingResourceResource): CodingResource {
    return {
      id: resource.id,
      description: resource.description || '',
      url: resource.url || '',
      types: resource.types ?? [],
      topics: resource.topics ?? [],
      levels: resource.levels ?? [],
      urlToLogo: resource.url ? this.logoApi.getUrlToLogo(resource.url) : '',
    };
  }

  /**
   * Converts the full API response into domain entities.
   *
   * @param response - Array of raw coding resources returned by SampleAPIs.
   * @returns Array of CodingResource entities.
   */
  static toEntitiesFromResponse(response: CodingResourceResource[]): CodingResource[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }
}
