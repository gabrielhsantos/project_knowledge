import { UserResponseDto } from '@core/domain/dtos/user.dto';
import { User } from '@core/infrastructure/entities/user.entity';

export const userResponse = (user: User): UserResponseDto => {
  return {
    id: user.uuid!,
  };
};
