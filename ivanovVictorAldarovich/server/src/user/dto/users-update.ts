import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput  {
    @Field(() => String)
    id: number;
    @Field(() => String)
    username: string;
    @Field(() => String)
    email: string;
}