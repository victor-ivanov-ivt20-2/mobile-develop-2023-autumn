import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
}
