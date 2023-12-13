import { Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query(() => [User])
  async showAllUserNickname() {
    return this.userService.findAll();
  }
}
