import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class ChangePasswordInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
    @IsNotEmpty()
    @IsString()
    @Field()
    id: string;
}
