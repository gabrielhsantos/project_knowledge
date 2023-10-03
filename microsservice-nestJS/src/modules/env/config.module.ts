import { Module } from '@nestjs/common';
import {
  ConfigModule as ConfigModuleNest,
  ConfigService,
} from '@nestjs/config';
import { mapEnvToConfiguration } from './map-env-to-configuration';

@Module({
  exports: [ConfigModuleNest, ConfigService],
  imports: [
    ConfigModuleNest.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      expandVariables: true,
      load: [mapEnvToConfiguration],
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
