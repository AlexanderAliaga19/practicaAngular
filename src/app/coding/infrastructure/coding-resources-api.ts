import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LogoDevApi } from '../../shared/infrastructure/logo-dev-api';
import { CodingResource } from '../domain/model/coding-resource.entity';
import { CodingResourceResource } from './coding-resource-response';
import { CodingResourceAssembler } from './coding-resource-assembler';

/**
 * Infrastructure gateway for the coding resources API.
 *
 * @remarks
 * This service handles the HTTP request to SampleAPIs and returns domain
 * entities instead of raw JSON. I keep the endpoint configuration in the
 * environment files to avoid hardcoding the complete URL here.
 *
 * @example
 * ```typescript
 * this.codingResourcesApi.getCodingResources().subscribe(resources => {
 *   console.log(resources);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CodingResourcesApi {
  /** Base URL configured for the coding resources API. */
  private baseUrl = environment.codingResourcesApiBaseUrl;

  /** Endpoint path configured for coding resources. */
  private codingResourcesEndpoint = environment.codingResourcesEndpointPath;

  /** Angular HTTP client used for the request. */
  private http = inject(HttpClient);

  /** Shared logo service used by the assembler. */
  private logoApi = inject(LogoDevApi);

  /**
   * Gets all coding resources from the API.
   *
   * @returns Observable with the list of CodingResource domain entities.
   */
  getCodingResources(): Observable<CodingResource[]> {
    return this.http
      .get<CodingResourceResource[]>(`${this.baseUrl}${this.codingResourcesEndpoint}`)
      .pipe(
        map(response =>
          CodingResourceAssembler
            .withLogoApi(this.logoApi)
            .toEntitiesFromResponse(response)
        )
      );
  }
}
