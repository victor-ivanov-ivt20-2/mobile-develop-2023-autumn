import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType()
export class ChangePasswordResponse {
    @Field(() => User)
    user: User;
}
