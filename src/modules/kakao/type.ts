import { ModuleMetadata, Provider } from '@nestjs/common';

export interface KakaoConfig {
  CLIENT_ID: string;
  SECRET_KEY: string;
  ADMIN_KEY: string;
  REDIRECT_URL: string;
}

export interface KakaoForRootProps extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<KakaoConfig> | KakaoConfig;
  inject?: any[];
  extraProviders?: Provider[];
}
