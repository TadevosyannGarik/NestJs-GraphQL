// В этом фале передаем значения которые нужны для создания сущности
import { Field, InputType } from "@nestjs/graphql";

@InputType()
// передаем значения для создания сущности
export class CreateUserInput{
    @Field()
    email: string

    @Field({nullable: true})
    name: string
}