import { mapEnvToConfiguration } from '@modules/env/map-env-to-configuration';
import { JwtService } from '@nestjs/jwt';

const { auth } = mapEnvToConfiguration();

export const generateToken = (uuid: string) => {
  return new JwtService().sign(
    { userId: uuid, iat: Date.now() },
    { secret: auth.secret },
  );
};

export const decodeToken = (token: string) => {
  return new JwtService().decode(token);
};

export const verifyToken = (token: string) => {
  return new JwtService().verify(token, { secret: auth.secret });
};
