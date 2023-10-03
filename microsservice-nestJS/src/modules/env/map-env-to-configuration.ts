import { TEnvironmentConfig } from './types';

export const mapEnvToConfiguration = (): TEnvironmentConfig => ({
  api: {
    port: parseInt(process.env.API_PORT as string),
  },
  db: {
    dialect: process.env.DIALECT!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    storage: process.env.DB_STORAGE!,
  },
});
