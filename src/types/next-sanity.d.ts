/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'next-sanity' {
  import { ClientConfig } from '@sanity/client'
  import type { ImageUrlBuilder } from '@sanity/image-url'

  export function createClient(config: ClientConfig): any

  export interface SanityClient {
    fetch<T = any>(query: string, params?: Record<string, any>): Promise<T>
  }

  export default createClient

  export type { ImageUrlBuilder }
}
