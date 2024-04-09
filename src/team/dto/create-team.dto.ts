import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateTeamDTO {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  userIds: number[];
}
