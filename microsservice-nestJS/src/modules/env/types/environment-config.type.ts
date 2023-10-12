import { TEnvironmentAPIConfig } from './environment-api-config.type';
import { TEnvironmentAuthConfig } from './environment-auth-config.type';
import { TEnvironmentDatabaseConfig } from './environment-database-config.type';

export type TEnvironmentConfig = {
  api: TEnvironmentAPIConfig;
  db: TEnvironmentDatabaseConfig;
  auth: TEnvironmentAuthConfig;
};
